import { StepBase } from '.'
import { TElement } from '@udecode/plate-core'

export type BubbleStep =
  | TextBubbleStep
  | ImageBubbleStep
  | VideoBubbleStep
  | EmbedBubbleStep

export enum BubbleStepType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  EMBED = 'embed',
}

export type BubbleStepContent =
  | TextBubbleContent
  | ImageBubbleContent
  | VideoBubbleContent
  | EmbedBubbleContent

export type TextBubbleStep = StepBase & {
  type: BubbleStepType.TEXT
  content: TextBubbleContent
}

export type ImageBubbleStep = StepBase & {
  type: BubbleStepType.IMAGE
  content: ImageBubbleContent
}

export type VideoBubbleStep = StepBase & {
  type: BubbleStepType.VIDEO
  content: VideoBubbleContent
}

export type EmbedBubbleStep = StepBase & {
  type: BubbleStepType.EMBED
  content: EmbedBubbleContent
}

export type TextBubbleContent = {
  html: string
  richText: TElement[]
  plainText: string
}

export type ImageBubbleContent = {
  url?: string
}

export type EmbedBubbleContent = {
  url?: string
  height: number
}

export enum VideoBubbleContentType {
  URL = 'url',
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
}

export type VideoBubbleContent = {
  type?: VideoBubbleContentType
  url?: string
  id?: string
}

export const defaultTextBubbleContent: TextBubbleContent = {
  html: '',
  richText: [],
  plainText: '',
}

export const defaultImageBubbleContent: ImageBubbleContent = {}

export const defaultVideoBubbleContent: VideoBubbleContent = {}

export const defaultEmbedBubbleContent: EmbedBubbleContent = { height: 400 }
