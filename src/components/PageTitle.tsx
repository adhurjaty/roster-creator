interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => (
  <div className='my-2 flex justify-center'>
    <h1>{title}</h1>
  </div>
);

export default PageTitle;
