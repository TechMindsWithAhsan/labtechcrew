import { Container } from '@/components/ui/layout'
import { Badge } from '@/components/ui/card'

const TECH_BADGES = [
  'RAG architecture',
  'Vector search',
  'Next.js',
  'React Native',
  'TypeScript',
  'Evaluation harness',
]

export function TechBadges() {
  return (
    <Container className="flex flex-col items-center gap-4 pb-10 pt-2 md:pb-14">
      <p className="text-eyebrow uppercase text-(--color-text-subtle)">
        Built with the same stack we ship for clients
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {TECH_BADGES.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>
    </Container>
  )
}
