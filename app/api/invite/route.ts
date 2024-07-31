// app/api/invite/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const token = process.env.GITHUB_ACCESS_TOKEN!; // A personal access token with admin:org scope

  try {
    const isEmail = input.includes('@');
    const endpoint = isEmail
      ? `https://api.github.com/orgs/Eli-Jensen-Org/invitations`
      : `https://api.github.com/orgs/Eli-Jensen-Org/memberships/${input}`;

    await axios({
      method: isEmail ? 'POST' : 'PUT',
      url: endpoint,
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      data: isEmail ? { email: input } : {},
    });

    return NextResponse.json({ message: 'Invitation sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send invitation' }, { status: 500 });
  }
}
