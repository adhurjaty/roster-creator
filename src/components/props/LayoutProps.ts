export default interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}