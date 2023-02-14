interface Props {
  text: string;
}

const ErrorText = ({ text }: Props) => <div className='text-red'>{text}</div>;

export default ErrorText;
