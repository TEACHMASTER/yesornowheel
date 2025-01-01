import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: false
    },
    publishedAt: {
      type: 'date',
      required: false
    },
    summary: {
      type: 'string',
      required: false,
    },
    author: {
      type: 'string',
      required: false,
    },
    authorImg: {
      type: 'string',
      required: false,
    },
    image: {
      type: 'string',
      required: false,
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },    
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
})