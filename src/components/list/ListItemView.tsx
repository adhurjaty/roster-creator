import { useRouter } from 'next/router';

interface ListItem {
  name: string;
  location?: string;
}

interface Props {
  item: ListItem;
  children?: React.ReactNode;
}

const ListItemView = ({ item, children }: Props) => {
  const router = useRouter();

  return (
    <li
      className='w-full border-b border-gray-200 px-6 py-2'
      onClick={() => item.location && router.push(item.location)}
    >
      {children ?? item.name}
    </li>
  );
};

export default ListItemView;
