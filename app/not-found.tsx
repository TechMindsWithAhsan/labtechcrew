import { Container, Section } from '@/components/ui/layout'
import { ButtonLink } from '@/components/ui/button'

/**
 * A REAL 404. Dynamic pages must call notFound() rather than rendering an
 * "oops" page with a 200 status — a soft 404 shows up in Search Console and
 * is the standard sign that notFound() is not being used.
 */
export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="flex max-w-xl flex-col gap-5">
          <p className="text-eyebrow uppercase text-(--color-accent)">404</p>
          <h1 className="text-display-2">That page moved, or never existed</h1>
          <p className="text-body-lg text-(--color-text-muted)">
            If you followed a link from an old version of this site, try the services page; most
            of the old URLs redirect there now.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/services/">See our services</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  )
}
