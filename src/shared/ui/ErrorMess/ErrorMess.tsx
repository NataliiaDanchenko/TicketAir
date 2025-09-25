interface ErrorProps {
  message: string;
  action: React.JSX.Element;
}

export const ErrorMess= ({message, action}: ErrorProps) => {
  return (
    <div style={{ color: 'red', marginTop: '8px' }}>
      <p>{message}</p>
      <div style={{ marginTop: '8px' }}>{action}</div>
    </div>
  );
}