import { useEffect } from 'react'
import { useRoute, useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import styles from './ArticlesTab.module.css'
import {
  setTabActive,
  setTabVisible,
  setTagTabName,
  unsetTabs,
  unsetTabsActive,
} from 'features/articles/slice'

export function ArticlesTab() {
  const dispatch = useAppDispatch()
  const [, setLocation] = useLocation()
  const [matchHome] = useRoute('/')
  const [matchProfile, params1] = useRoute('/profile/:username')
  const [matchFavorites, params2] = useRoute('/profile/:username/favorites')
  const username = params1?.username || params2?.username

  const { tag } = useAppSelector(
    (state) => state.articles.data.getArticlesFilter
  )
  const { articleTabs } = useAppSelector((state) => state.articles.data)
  useEffect(() => {
    if (matchProfile) {
      dispatch(unsetTabs())
      dispatch(setTabActive([3, true]))
      dispatch(setTabActive([4, false]))
      dispatch(setTabVisible([3, true]))
      dispatch(setTabVisible([4, true]))
    }
    if (matchFavorites) {
      dispatch(unsetTabs())
      dispatch(setTabActive([4, true]))
      dispatch(setTabActive([3, false]))
      dispatch(setTabVisible([3, true]))
      dispatch(setTabVisible([4, true]))
    }
    if (matchHome) {
      let previousActiveTabIndex = articleTabs.findIndex(
        (tab) => tab.previousActive
      )
      dispatch(unsetTabs())
      dispatch(setTabVisible([0, true]))
      if (tag) {
        dispatch(setTagTabName(tag))
        dispatch(setTabVisible([2, true]))
      }
      previousActiveTabIndex === -1
        ? tag
          ? dispatch(setTabActive([2, true]))
          : dispatch(setTabActive([0, true]))
        : dispatch(setTabActive([previousActiveTabIndex, true]))
    }
  }, [dispatch, matchProfile, matchFavorites, matchHome, tag])

  function handleTabClick(tabType: string, tabIndex: number) {
    if (matchProfile || matchFavorites) {
      tabType === 'author'
        ? setLocation(`/profile/${username}`)
        : setLocation(`/profile/${username}/favorites`)
    }
    dispatch(unsetTabsActive())
    dispatch(setTabActive([tabIndex, true]))
  }

  return (
    <div>
      {articleTabs.map(
        (tab, index) =>
          tab.visible && (
            <button
              className={tab.active ? styles.activeTab : styles.inactiveTab}
              key={`tab-${tab.name}`}
              onClick={() => handleTabClick(tab.type, index)}
            >
              {tab.name}
            </button>
          )
      )}
    </div>
  )
}
