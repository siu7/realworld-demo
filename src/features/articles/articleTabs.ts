import type { ArticleTab } from './slice'
export const articleTabs: ArticleTab[] = [
  {
    name: 'Your Feed',
    type: 'feed',
    active: false,
    visible: false,
    previousActive: false,
  },
  {
    name: 'Global Feed',
    type: 'global',
    active: false,
    visible: false,
    previousActive: false,
  },
  {
    name: '',
    type: 'tag',
    active: false,
    visible: false,
    previousActive: false,
  },
  {
    name: 'My Articles',
    type: 'author',
    active: false,
    visible: false,
  },
  {
    name: 'Favorited Articles',
    type: 'favorited',
    active: false,
    visible: false,
  },
]
