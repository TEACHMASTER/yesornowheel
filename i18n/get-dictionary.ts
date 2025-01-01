import type { Locale } from './config'
import { allPosts } from 'contentlayer/generated'

export const getGames = async (locale:Locale) => { 
  return allPosts.filter((post) => post.slug.includes(`${locale}/tools`))
}

export const getBlogs = async (locale: Locale) => { 
  return allPosts.filter((post) => post.slug.includes(`${locale}/blog/`))
}