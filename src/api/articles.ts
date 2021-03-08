import { api, authHeader } from './config'
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

interface AddCommentRequestBody {
  comment: {
    body: string
  }
}

interface CommentResponse {
  comment: Comment
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
  AddCommentRequestBody,
  CommentResponse,
  MultipleCommentsResponse,
}

let wretch = api.url('/articles')

const listArticles = async (
  params: ListArticlesParams = {},
  token: string | null
): Promise<MultipleArticlesResponse> =>
  token
    ? await wretch.auth(authHeader(token)).query(params).get().json()
    : await wretch.query(params).get().json()

const feedArticles = async (
  params: FeedArticlesParams = {},
  token: string
): Promise<MultipleArticlesResponse> =>
  await wretch.auth(authHeader(token)).url('/feed').query(params).get().json()

const getArticle = async (slug: string): Promise<ArticleResponse> =>
  await wretch.url(`/${slug}`).get().json()

const createArticle = async (
  article: CreateArticleRequestBody,
  token: string
): Promise<ArticleResponse> =>
  await wretch.auth(authHeader(token)).post(article).json()

const updateArticle = async (
  slug: string,
  article: UpdateArticleRequestBody,
  token: string
): Promise<ArticleResponse> =>
  await wretch.auth(authHeader(token)).url(`/${slug}`).put(article).json()

const deleteArticle = async (slug: string, token: string): Promise<any> =>
  await wretch.auth(authHeader(token)).url(`/${slug}`).delete().json()

const addComment = async (
  slug: string,
  comment: AddCommentRequestBody,
  token: string
): Promise<CommentResponse> =>
  await wretch
    .auth(authHeader(token))
    .url(`/${slug}/comments`)
    .post(comment)
    .json()

const getComments = async (
  slug: string,
  token: string | null
): Promise<MultipleCommentsResponse> =>
  token
    ? await wretch.auth(authHeader(token)).url(`/${slug}/comments`).get().json()
    : await wretch.url(`/${slug}/comments`).get().json()

const deleteComment = async (
  slug: string,
  id: number,
  token: string
): Promise<any> =>
  await wretch
    .auth(authHeader(token))
    .url(`/${slug}/comments/${id}`)
    .delete()
    .json()

const favoriteArticle = async (
  slug: string,
  token: string
): Promise<ArticleResponse> =>
  await wretch.auth(authHeader(token)).url(`/${slug}/favorite`).post().json()

const unfavoriteArticle = async (
  slug: string,
  token: string
): Promise<ArticleResponse> =>
  await wretch.auth(authHeader(token)).url(`/${slug}/favorite`).delete().json()

export const articlesApi = {
  listArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addComment,
  getComments,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
}
