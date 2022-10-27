import React from 'react';
import ShareLink from '@material-ui/icons/Share';
import { RWebShare } from 'react-web-share';

export default function AppShare() {
    return (
        <RWebShare
            data={{
                title: 'Web Toolbox',
                text: 'Collection of web developer utilities',
                url: 'https://amwebexpert.github.io/etoolbox',
            }}>
            <ShareLink />
        </RWebShare>
    );
}
