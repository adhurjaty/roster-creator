import ListItemView from '@/components/ListItemView';

interface ListItem {
  key?: string;
  name: string;
}

interface Props {
  list: ListItem[];
}

const ListView = ({ list }: Props) => (
  <div className='flex justify-center'>
    <ul className='w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
      {list.map((el) => (
        <ListItemView item={el} key={el.key ?? el.name} />
      ))}
    </ul>
  </div>
);

export default ListView;
