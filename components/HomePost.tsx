import { Post } from "contentlayer/generated";
import { format } from "date-fns";
import { Mdx } from "./mdx/mdx";
import PostDate from "./post-date";
import Image from "next/image";
interface HomePostProps {
  post: Post;
  isHome?: boolean;
}

export function HomePost({ post, isHome = false }: HomePostProps) {
  return (
    <section className="relative">
      {!isHome && post.image && (
        <div className="absolute inset-0 h-128 pt-16 box-content">
          <Image
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            src={post.image}
            width={1440}
            height={577}
            priority
            alt={post.title ?? ''}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900"
            aria-hidden="true"
          ></div>
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`pt-32 pb-12 ${isHome ? "md:pt-0" : "md:pt-40"} md:pb-20`}>
          <div className="max-w-3xl mx-auto">
            <article>
              {!isHome && (
                <>
                  <header className="mb-8">
                    <div className="text-center md:text-left">
                      <h1
                        className="h1 font-red-hat-display mb-4"
                        data-aos="fade-down"
                      >
                        {post.title}
                      </h1>
                      <p
                        className="text-xl text-gray-600 dark:text-gray-400"
                        data-aos="fade-down"
                        data-aos-delay="150"
                      >
                        {post.summary}
                      </p>
                    </div>
                    {/* Article meta */}
                    <div className="md:flex md:items-center md:justify-between mt-5">
                      {/* Author meta */}
                      <div
                        className="flex items-center justify-center"
                        data-aos="fade-down"
                        data-aos-delay="300"
                      >
                        <a href="#0">
                          <Image
                            className="rounded-full shrink-0 mr-3"
                            src={post.authorImg ?? ''}
                            width={32}
                            height={32}
                            alt={post.author ?? '' }
                          />
                        </a>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">
                            By{" "}
                          </span>
                          <a
                            className="font-medium text-gray-800 dark:text-gray-300 hover:underline"
                            href="#0"
                          >
                            {post.author}
                          </a>
                          <span className="text-gray-600 dark:text-gray-400">
                            {" "}
                            · <PostDate dateString={post.publishedAt ?? ''} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </header>
                  <hr
                    className="w-5 h-px pt-px bg-gray-400 dark:bg-gray-500 border-0 mb-8"
                    data-aos="fade-down"
                    data-aos-delay="450"
                  />
                </>
              )}
              <div className="mb-8" data-aos="fade-up" data-aos-delay="450">
                <Mdx code={post.body.code} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
