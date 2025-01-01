import Image from 'next/image'
import AboutImage01 from '@/public/images/about-grid-01.jpg'
import AboutImage02 from '@/public/images/about-grid-02.jpg'
import AboutImage03 from '@/public/images/about-grid-03.jpg'
import AboutImage04 from '@/public/images/about-grid-04.jpg'
import AboutImage05 from '@/public/images/about-grid-05.jpg'
import AboutImage06 from '@/public/images/about-grid-06.jpg'
import { allPosts } from 'contentlayer/generated'
import { HomePost } from '@/components/HomePost'
import { useLocale } from 'next-intl'
export default function FeaturesGallery() {

  const locale = useLocale()
  const latestPost = allPosts.find(post => post.slug.startsWith(locale+'/about'))

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 pb-12 md:pt-8 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-0">
             {latestPost && <HomePost post={latestPost} isHome={true} />}
          </div>

          {/* Images grid */}
          <div className="grid grid-cols-12 gap-3 mt-12 md:mt-0" data-aos-id-gallery>
            <Image className="col-span-4" src={AboutImage01} width={360} height={270} alt="About grid 01" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" />
            <Image className="col-span-3" src={AboutImage02} width={270} height={270} alt="About grid 02" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" data-aos-delay="100" />
            <Image className="col-span-5" src={AboutImage03} width={450} height={270} alt="About grid 03" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" data-aos-delay="200" />
            <Image className="col-span-3" src={AboutImage04} width={270} height={270} alt="About grid 04" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" data-aos-delay="300" />
            <Image className="col-span-5" src={AboutImage05} width={450} height={270} alt="About grid 05" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" data-aos-delay="400" />
            <Image className="col-span-4" src={AboutImage06} width={360} height={270} alt="About grid 06" data-aos="fade-down" data-aos-anchor="[data-aos-id-gallery]" data-aos-delay="500" />
          </div>

        </div>
      </div>
    </section>
  )
}