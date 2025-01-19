import Link from '@mui/material/Link';
import React, { FunctionComponent, PropsWithChildren } from 'react';

interface MarkdownLinkProps extends PropsWithChildren {
  href?: string;
}

export const MarkdownLink: FunctionComponent<MarkdownLinkProps> = ({ href, children }) => (
  <Link href={href}>{children}</Link>
);
