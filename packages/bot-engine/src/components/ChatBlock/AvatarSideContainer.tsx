import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Avatar } from '../avatars/Avatar'
import { useFrame } from 'react-frame-component'
import { CSSTransition } from 'react-transition-group'

type Props = { hostAvatarSrc?: string; keepShowing: boolean }

export const AvatarSideContainer = forwardRef(
  ({ hostAvatarSrc, keepShowing }: Props, ref: ForwardedRef<unknown>) => {
    const { document } = useFrame()
    const [show, setShow] = useState(false)
    const [avatarTopOffset, setAvatarTopOffset] = useState(0)

    const refreshTopOffset = () => {
      if (!scrollingSideBlockRef.current || !avatarContainer.current) return
      const { height } = scrollingSideBlockRef.current.getBoundingClientRect()
      const { height: avatarHeight } =
        avatarContainer.current.getBoundingClientRect()
      setAvatarTopOffset(height - avatarHeight)
    }
    const scrollingSideBlockRef = useRef<HTMLDivElement>(null)
    const avatarContainer = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => ({
      refreshTopOffset,
    }))

    useEffect(() => {
      setShow(true)
      const resizeObserver = new ResizeObserver(refreshTopOffset)
      resizeObserver.observe(document.body)
      return () => {
        resizeObserver.disconnect()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        className="flex w-6 xs:w-10 mr-2 mb-2 flex-shrink-0 items-center relative typebot-avatar-container "
        ref={scrollingSideBlockRef}
      >
        <CSSTransition
          classNames="bubble"
          timeout={500}
          in={show && keepShowing}
          unmountOnExit
        >
          <div
            className="absolute w-6 xs:w-10 h-6 xs:h-10 mb-4 xs:mb-2 flex items-center top-0"
            ref={avatarContainer}
            style={{
              top: `${avatarTopOffset}px`,
              transition: 'top 350ms ease-out, opacity 500ms',
            }}
          >
            <Avatar avatarSrc={hostAvatarSrc} />
          </div>
        </CSSTransition>
      </div>
    )
  }
)
