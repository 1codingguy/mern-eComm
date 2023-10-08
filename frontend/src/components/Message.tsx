import { Alert } from 'react-bootstrap'

type MessageType = {
  variant: string
  children: JSX.Element
}

const Message = ({ variant, children }: MessageType) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProp = {
  variant: 'info',
}

export default Message
