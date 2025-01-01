'use client'

import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image'
// Import Swiper
import { useLocale, useTranslations } from 'next-intl'


export default function Carousel({ params: { index=false,toolname="" } }: { params: { index?: boolean,toolname?: string } }) {
  const locale = useLocale()
  const t = useTranslations(`${toolname}.carousel`)

  const posts = allPosts
    .filter(post => index?post.slug.startsWith(locale+'/tools/'):!post.slug.includes(locale+"/tools/"+toolname)&&post.slug.startsWith(locale+'/tools/'))
    .sort((a, b) => {
      const dateA = a.publishedAt ?? '';
      const dateB = b.publishedAt ?? '';
      return (new Date(dateA) > new Date(dateB)) ? -1 : 1;
    });
  
  if(posts.length===0){
    return 
  }

  return (
    <section className="border-t border-transparent dark:border-gray-800">
      <div className="py-12 md:py-0">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="h2 font-red-hat-display mb-4">{t('h2')}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{ t('p')}</p>
          </div>

        </div>


        {/* Articles list */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pb-12 md:pb-20">
              <div className="lg:flex lg:justify-between">
                <div className="lg:grow" data-aos="fade-down" data-aos-delay="200">
                  <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 md:gap-y-8 items-start">
                    {posts.map((post, postIndex) => (
                      <article  key={postIndex}  className="flex flex-col h-full">
                        <header>
                          {post.image &&
                            <Link className="block mb-1" href={locale+`/${post.author}`} title={post.title??""}>
                              <figure className="relative h-0 pb-9/16">
                                <Image className="absolute inset-0 w-full h-full object-cover" src={post.image} width={352} height={198} alt={post.title??""} />
                              </figure>
                            </Link>
                          }
                          <Link className="hover:underline" href={locale+`/${post.author}`}>
                            <h3 className="h4 font-red-hat-display mb-2">{post.title}</h3>
                          </Link>
                        </header>
                        <p className="text-gray-600 dark:text-gray-400 grow">{post.summary}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  )
}