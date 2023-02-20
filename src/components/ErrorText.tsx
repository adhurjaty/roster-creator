interface Props {
  text: string;
  className?: string;
}

const ErrorText = ({ text, className }: Props) => (
  <div className={`${className} text-red-600`}>{text}</div>
);

export default ErrorText;
