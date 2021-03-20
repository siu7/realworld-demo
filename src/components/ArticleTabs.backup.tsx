import { useEffect } from 'react'
import { useRoute, useLocation } from 'wouter'
import { useImmer } from 'use-immer'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import styles from './ArticlesTab.module.css'
import { setSelectedTabType } from 'features/articles/slice'

type TabType = 'global' | 'feed' | 'tag' | 'favorited' | 'author'
interface Tab {
  name: string
  type: TabType
  isActive: boolean
}

export function ArticlesTab() {
  const dispatch = useAppDispatch()
  let initialTabs: Tab[] = []
  const [matchHome] = useRoute('/')
  if (matchHome)
    initialTabs.push({
      name: 'Global Feed',
      type: 'global',
      isActive: true,
    })

  const [matchProfile, params1] = useRoute('/profile/:username')
  const [matchFavorites, params2] = useRoute('/profile/:username/favorites')
  const params = params1 || params2
  if (matchProfile || matchFavorites) {
    let tmp: Tab[] = [
      {
        name: 'My Articles',
        type: 'author',
        isActive: true,
      },
      {
        name: 'Favorited Articles',
        type: 'favorited',
        isActive: false,
      },
    ]
    if (matchFavorites) {
      tmp[0].isActive = false
      tmp[1].isActive = true
    }
    initialTabs = initialTabs.concat(tmp)
  }

  const { homeSelectedTabType } = useAppSelector((state) => state.articles.data)
  const { tag } = useAppSelector(
    (state) => state.articles.data.getArticlesFilter
  )
  const [tabs, setTabs] = useImmer<Tab[]>(initialTabs)

  useEffect(() => {
    if (!matchProfile && !matchFavorites) {
      let homeSelectedTabIndex = tabs.findIndex(
        (tab) => tab.type === homeSelectedTabType
      )
      if (tag) {
        setTabs((draft) => {
          draft.forEach((tab) => (tab.isActive = false))
          let tagTabIndex = draft.findIndex((tab) => tab.type === 'tag')
          let tagTab: Tab = {
            name: `#${tag}`,
            type: 'tag',
            isActive: true,
          }
          if (tagTabIndex >= 0) {
            if (homeSelectedTabType !== 'tag') {
              tagTab.isActive = false
              draft[tagTabIndex] = tagTab
              dispatch(setSelectedTabType(homeSelectedTabType))
            }
          } else {
            draft.push(tagTab)
            dispatch(setSelectedTabType('tag'))
          }
        })
      } else {
        setTabs((draft) => {
          draft.forEach((tab) => (tab.isActive = false))
          draft[homeSelectedTabIndex].isActive = true
          dispatch(setSelectedTabType(homeSelectedTabType))
        })
      }
    }
  }, [
    tag,
    setTabs,
    tabs.length,
    dispatch,
    matchProfile,
    matchFavorites,
    homeSelectedTabType,
  ])

  function handleTabClick(tabIndex: number) {
    setTabs((draft) => {
      draft.forEach((tab) => (tab.isActive = false))
      draft[tabIndex].isActive = true
    })
    dispatch(setSelectedTabType(tabs[tabIndex].type))
    if (matchProfile || matchFavorites) {
      tabIndex === 0
        ? setLocation(`/profile/${params?.username}`)
        : setLocation(`/profile/${params?.username}/favorites`)
    }
  }

  const [, setLocation] = useLocation()
  return (
    <div>
      {tabs.map((tab, index) => (
        <button
          className={tab.isActive ? styles.activeTab : styles.inactiveTab}
          key={`tab-${tab.name}`}
          onClick={() => handleTabClick(index)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  )
}
