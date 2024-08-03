// app/page.js or app/page.tsx

import { redirect } from 'next/navigation';

export default function HomePage() {
  // Perform redirection
  redirect('/invite');

  // The component can return null
  return null;
}