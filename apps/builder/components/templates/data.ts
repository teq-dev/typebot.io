export type TemplateProps = {
  name: string
  emoji: string
  fileName: string
  isComingSoon?: boolean
}

export const templates: TemplateProps[] = [
  { name: 'Lead Generation', emoji: '🤝', fileName: 'lead-gen.json' },
  { name: 'Customer Support', emoji: '😍', fileName: 'customer-support.json' },
  { name: 'Quiz', emoji: '🕹️', fileName: 'quiz.json' },
  {
    name: 'Lead Scoring',
    emoji: '🏆',
    fileName: 'customer-support.json',
    isComingSoon: true,
  },
  {
    name: 'FAQ',
    emoji: '💬',
    fileName: 'customer-support.json',
    isComingSoon: true,
  },
  {
    name: 'Conversational Resume',
    emoji: '👨‍💼',
    fileName: 'customer-support.json',
    isComingSoon: true,
  },
  {
    name: 'User Onboarding',
    emoji: '🧑‍🚀',
    fileName: 'customer-support.json',
    isComingSoon: true,
  },
]
