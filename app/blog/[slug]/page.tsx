import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container, Section, Eyebrow } from '@/components/ui/layout'
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { JsonLd } from '@/components/ui/json-ld'
import { CtaBand } from '@/components/sections/blocks'
import { pageMetadata, breadcrumbSchema, articleSchema } from '@/lib/seo'
import { getAllPosts, getPost } from '@/lib/content'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.publishedAt.toISOString(),
          dateModified: post.updatedAt.toISOString(),
        })}
      />

      <Section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/blog/' },
              { name: post.title },
            ]}
          />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="text-display-1">{post.title}</h1>
            <p className="text-body-lg text-(--color-text-muted)">{post.description}</p>
            <p className="text-small text-(--color-text-subtle)">
              {post.publishedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              · {post.readingMinutes} min read
            </p>
          </div>
        </Container>
      </Section>

      <Section space="tight">
        <Container>
          <article
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
          <div className="mt-12 border-t border-(--color-border) pt-8">
            <Link
              href="/blog/"
              className="text-(--color-accent) hover:underline"
            >
              ← Back to all posts
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand title="Have a project like this?" accent="like this" />
    </>
  )
}
