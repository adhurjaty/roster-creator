import ListItemView from '@/components/list/ListItemView';

interface ListItem {
  key?: string;
  location?: string;
  name: string;
}

interface Props<T extends ListItem> {
  list: T[];
  children?: (item: T) => React.ReactNode;
}

const ListView = <T extends ListItem>({ list, children }: Props<T>) => (
  <div className='flex justify-center'>
    <ul className='w-96 rounded-lg border border-gray-200 bg-white text-gray-900'>
      {list.map((el) => (
        <ListItemView item={el} key={el.key ?? el.name}>
          {children?.(el)}
        </ListItemView>
      ))}
    </ul>
  </div>
);

export default ListView;
