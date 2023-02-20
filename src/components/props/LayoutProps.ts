export default interface LayoutProps {
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}