import { useEffect, useCallback } from 'react'
import { useRoute, useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import styles from './ArticlesTab.module.css'
import {
  setTabActive,
  unsetTabs,
  unsetTabsActive,
  setHomeTabs,
  setAuthedHomeTabs,
  setProfileTabs,
  setFavoritesTabs,
} from 'features/articles/slice'

export function ArticlesTab() {
  const dispatch = useAppDispatch()
  const [, setLocation] = useLocation()
  const [matchHome] = useRoute('/')
  const [matchProfile, params1] = useRoute('/profile/:username')
  const [matchFavorites, params2] = useRoute('/profile/:username/favorites')
  const username = params1?.username || params2?.username

  const { articleTabs } = useAppSelector((state) => state.articles.data)
  const { user } = useAppSelector((state) => state.user.data)

  const init = useCallback(() => {
    if (matchProfile) {
      dispatch(unsetTabs())
      dispatch(setProfileTabs())
    }
    if (matchFavorites) {
      dispatch(unsetTabs())
      dispatch(setFavoritesTabs())
    }
    if (matchHome) {
      dispatch(unsetTabs())
      user ? dispatch(setAuthedHomeTabs()) : dispatch(setHomeTabs())
    }
  }, [dispatch, matchProfile, matchHome, matchFavorites, user])

  useEffect(() => {
    init()
  }, [init])

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
