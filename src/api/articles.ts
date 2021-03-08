import { api } from './config'
import type { Profile } from 'api/profiles'

interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: [string]
  createdAt: Date
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  author: Profile
}

interface ArticleResponse {
  article: Article
}

interface MultipleArticlesResponse {
  articles: [Article]
  articlesCount: number
}

interface ListArticlesParams {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

interface FeedArticlesParams {
  limit?: number
  offset?: number
}

interface CreateArticleRequestBody {
  article: {
    title: string
    description: string
    body: string
    tagList: [string]
  }
}

interface UpdateArticleRequestBody {
  article: {
    title?: string
    description?: string
    body?: string
  }
}

interface Comment {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: Profile
}

interface MultipleCommentsResponse {
  comments: [Comment]
}

export type {
  Article,
  ArticleResponse,
  MultipleArticlesResponse,
  ListArticlesParams,
  FeedArticlesParams,
  CreateArticleRequestBody,
  UpdateArticleRequestBody,
  Comment,
  MultipleCommentsResponse,
}

let wretch = api.url('/articles')

const listArticles = async (
  params: ListArticlesParams = {}
): Promise<MultipleArticlesResponse> => await wretch.query(params).get().json()

const feedArticles = async (
  params: FeedArticlesParams = {}
): Promise<MultipleArticlesResponse> =>
  await wretch.url('/feed').query(params).get().json()

const getArticle = async (slug: string): Promise<ArticleResponse> =>
  await wretch.url(`/${slug}`).get().json()

const createArticle = async (
  article: CreateArticleRequestBody
): Promise<ArticleResponse> => await wretch.post(article).json()

const updateArticle = async (
  slug: string,
  article: UpdateArticleRequestBody
): Promise<ArticleResponse> => await wretch.url(`/${slug}`).put(article).json()

const deleteArticle = async (slug: string): Promise<any> =>
  await wretch.url(`/${slug}`).delete().json()

const getComments = async (slug: string): Promise<MultipleCommentsResponse> =>
  await wretch.url(`/${slug}/comments`).get().json()

const deleteComment = async (slug: string, id: number): Promise<any> =>
  await wretch.url(`/${slug}/comments/${id}`).delete().json()

const favoriteArticle = async (slug: string): Promise<ArticleResponse> =>
  await wretch.url(`/${slug}/favorite`).post().json()

const unfavoriteArticle = async (slug: string): Promise<ArticleResponse> =>
  await wretch.url(`/${slug}/favorite`).delete().json()

export const articlesApi = {
  listArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getComments,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
}
