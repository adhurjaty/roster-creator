interface ListItem {
  name: string;
}

interface Props {
  item: ListItem;
}

const ListItemView = ({ item }: Props) => (
  <li className='w-full border-b border-gray-200 px-6 py-2'>{item.name}</li>
);

export default ListItemView;
