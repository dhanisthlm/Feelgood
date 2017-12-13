import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class HowItWorks extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div id="kakoradi" className="how-it-works">
                <h3 className="heading">{ t('heading') }</h3>
                <p className="preamble">{ t('intro') }</p>
                <div className="row-1">
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg viewBox="0 0 626 626" height="626pt" width="626pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h81.46c-.49 1.67-2.19 2.94-3.46 4.05-7.15 7.4-16.93 16.96-24.42 24.54-8.01 8.19-16.87 16.31-23.04 25.95-.98.55-1.6 1.37-1.85 2.46-1.75 2.72-4.7 6.57-6.31 9.34-1.84 4.77-5.5 8.42-6.84 14.22-1.24 1.95-1.88 4.07-2.91 6.12-1.71 3.39-2.16 7.61-4.17 10.78-.17 3.01-1.54 6.63-2.45 9.54-.3 1.73-.75 3.89-1.55 5.46-.37 7.15-2.23 11.44-1.92 18.08-.76.65-1.08 1.47-.96 2.46-.03 3.18.04 6.37-.04 9.54-.76.65-1.08 1.47-.96 2.46-.03 3.51.05 7.04-.04 10.54H0V0z" fill="transparent"/>
                                <path fill="#ffffff" d="M81.46 0h1.58c-.71 1.28.65 2.75 1.23 3.87C91.15 13.89 97.03 23.92 103.91 34c1.9 3.8 5.44 7.75 7.37 12 .28 1.17 2.21 1.71 2.42 3 2.43 4.46 5.07 7.75 7.75 12.56 4.45 6.36 8.11 13.13 12.6 19.39 2.33 2.82 3.67 7.25 6.49 9.51 1.36 3.34 4.73 7.77 6.4 10.54.62 2.53 3.09 3.68 3.52 6.54 2.3 1.98 3.78 4.26 4.99 7.02 1.68.95 1.45 2.85 2.89 4.13 1 2.11 2.58 3.54 3.12 5.85 2.64 1.93 3.88 5.86 5.87 8.46 2.8 3.4 4.21 7.52 7.21 10.46 2.03 4.66 7.89 12.17 10.76 17.54 1.71 2.52 3.57 5.21 4.99 8 .01 4.57-2.6 7.04-3.83 11.46-.52 3.46-2.82 5.48-2.92 9.09-1.7 2.67-2.14 6.32-4.08 8.9-.7 4.62-3.37 10.14-5.05 14.55-1.61 2.17-1.02 4.55-2.63 7-1.09 4.97-4.71 10.44-5.24 15.54-2.01 1.29-1.81 4.95-3.08 6.9-.99 3.89-3.15 7.1-3.92 11.11-1.35 2.33-.39 3.97 1 5.9.74 2.13 2.45 3.9 2.92 6.1l1.08.91c.83 3.06 2.95 5.74 4.68 8.37 1.02.87.7 2.49 1.78 3.17 3.06 4.06 5.67 10.22 9.12 13.96 2.54 4.96 7.73 12.15 11.32 16.6 2.29 4.66 6.63 8.39 9.02 12.98 2.57 2.19 4.08 4.91 6.31 7.69 5.19 5.84 9.65 12.28 15.05 17.97.64 1.56 1.39 2.26 2.85 3.08 5.35 6.76 12.02 12.9 17.68 19.39 8.12 8.56 16.26 16.03 24.78 24.11 2.95 2.45 5.42 5.35 8.59 7.56.71 1.15 2 2.9 3.28 3.34 3.32 2.31 6.34 5.42 9.64 7.72.86 1.29 1.72 2.25 3.17 2.89 8.79 6.77 18.2 14.47 27.31 20.6 2.65 2.3 5.96 4.34 8.92 6.07 1.98 1.97 4.36 3.02 6.61 4.42 2.53 2.49 6.22 3.7 8.8 6.16 2.47.96 4.62 2.93 7.19 3.86 3.32 2.82 6.7 3.95 10.36 6.28 3.34.48 6.62 4.92 10 4.35 7.8-2.65 18.05-7.01 25-9.22 2.49-.19 4.58-2.45 7-2.63 3.36-.55 5.62-2.71 8.94-3.41 6.41-2.28 13.16-4.8 19.51-7.31 1.67-.43 3.57-1.02 5-2 3.53-.17 5.8-2.27 9.09-2.92 2.11-1.52 4.75-1.47 6.91-3.08 2.27.03 2.9-1.72 5.1-1 1.72 2.14 5.06 2.98 6.91 5.08 1.69.22 2.46 1.23 3.68 2.2 4.65 2.26 10.92 7.52 15.47 9.68 2.53 2.14 5.74 3.48 8.44 5.41 2.18.56 2.07 2.34 4.49 2.63 1.24 1.18 2.73 1.95 4.1 2.95 3.54 1.95 5.96 4.7 9.9 6.05.95 1.44 2.68 2.15 4.18 2.88 1.22.89 2.31 1.86 3.82 2.12 2.27 2.67 5.65 3.49 7.92 6.08 3.01 1.05 5.96 3.39 8.54 5.2 5.25 3.19 11.18 6.55 15.95 10.31 11.16 6.56 24.14 15.48 35.05 22.18 4.59 3.49 12.2 6.95 16.46 11.31 3.14.9 6.03 3.6 9.09 4.92.57.74 1.21 1.43 1.91 2.08 3.03.74 4.22 2.89 7.11 3.91 1.45 1.47 3.41 2.58 5.43 3.01v1.58c-1.53-.6-3.11 2-4.07 2.96-14.12 13.52-28.49 29.25-42.87 42.1-2.71 2.26-5.82 4.15-8.4 6.54-2.94.96-4.95 3.7-8.21 4.82-3.99 3.75-9.64 5.73-14.5 8.27-3.92.95-7.53 3.8-11.5 4.73-5.58 2.46-9.88 3.13-15.45 4.95-1.89-.35-2.57 1.25-4.55 1.05-2.62 1.53-5.38.76-7.9 2.08-4.86.45-9.18 1.66-14.55 1.88-6.63 1.37-13.84.88-20.54 1.04l-.5.54h-25.01l.01-.78c-3.16-1.44-7.07.28-9.96-1.37-2.85-.47-5.68-.17-8.54-.31-.78-1.02-2.27-.99-3.46-1.56-12.79-2.14-24.7-4.77-37-8.68-3.55-.64-6.6-1.86-10-3.06-4.25-.81-6.72-2.84-11-3.53-4.22-1.91-9.13-3.92-13.55-5.17-3.94-2.46-9.84-3.97-14.07-5.95-7.01-2.74-13.43-6.72-20.43-9.47-3.4-2.48-7.64-3.95-11.49-5.58-2.28-2.17-5.56-2.99-7.92-5.08-3.45-1.14-4.38-2.81-7.65-4.18-2.1-.58-3.21-2.34-5.44-2.74-2.51-2.74-6.95-3.44-9.73-6.19-5.23-2.78-8.06-5.83-12.81-8.12-4.61-3.72-7.36-4.58-11.96-8.05-4.93-2.71-7.28-5.38-11.85-8.41-3.43-3.24-7.79-5.22-11.1-8.6-1.85-.37-2.12-1.84-3.82-2.45-3.34-3.09-7.32-5.13-10.54-8.33-1.27-1-2.57-2.55-4.18-2.85-2.23-2.12-4.68-5.46-7.4-6.72-4.5-4.36-9.89-8.04-14.34-12.5-2.88-1.59-4.82-4.41-7.44-6.59-1.24-1.32-3.1-2.54-3.74-4.27-.89-.27-1.67-.8-2.36-1.6-2.98-3.07-6.47-5.8-9.29-8.86-1.03-1.95-3.71-2.32-4.35-4.54-1.8-1.55-4.21-2.84-5.85-5.46-.19-1.15-1.56-1.67-2.41-2.21-7.71-8.33-14.95-16.06-22.93-24.17-1.72-2.92-4.46-4.82-6.32-7.62-1.25-2.11-3.36-3.33-4.58-5.45-1-1.76-2.96-2.71-3.73-4.55-3.05-3.64-7.86-8.28-10.18-12.54-1.46-.46-2.14-1.93-2.9-3.14-1.73-3.15-5.3-5.92-6.84-9.2-3.54-3.94-5.78-8.17-10.02-13.07-1.23-2.78-4.08-4.16-4.97-7.05-1.22-1.45-2.79-3.65-3.27-5.54-1.9-1-2.21-3.78-4.08-4.92-.69-2.39-3-4.1-3.73-6.54-2.67-4.23-5.13-6.53-7.19-11.54-2.19-1.27-2.94-4.65-4.32-6.61-1.66-3.85-4.42-6.29-5.68-10.39-2.12-1.8-2.88-5.25-4.75-7.41-1.8-3.54-4.24-7.9-5.72-11.05-.6-2.47-2.45-3.84-2.53-6.54-2.33-2.01-3.03-5.89-4.72-8.4-5.52-10.47-9.78-23.03-14.51-34.06-.75-3.07-2.68-5.22-2.77-8.55-2.38-4.17-3.11-9.48-5.08-13.88-.63-2.22-.51-4.75-1.74-6.57-.89-2.37-1.14-5.16-2.26-7.45-.1-1.44-.15-2.76-1-4-.12-1.45-.11-2.76-1-3.99-.75-5.53-2.43-12.98-3.65-18.52-1.05-1.36.45-3.1-1.35-4.5-.29-2.72.55-6.65-1-8.98-.06-3.32.05-7.23-.71-10.5l-.75-.5v-20.02h.54c.09-3.5.01-7.03.04-10.54-.12-.99.2-1.81.96-2.46.08-3.17.01-6.36.04-9.54-.12-.99.2-1.81.96-2.46-.31-6.64 1.55-10.93 1.92-18.08.8-1.57 1.25-3.73 1.55-5.46.91-2.91 2.28-6.53 2.45-9.54 2.01-3.17 2.46-7.39 4.17-10.78 1.03-2.05 1.67-4.17 2.91-6.12 1.34-5.8 5-9.45 6.84-14.22 1.61-2.77 4.56-6.62 6.31-9.34.25-1.09.87-1.91 1.85-2.46 6.17-9.64 15.03-17.76 23.04-25.95C61.07 21.01 70.85 11.45 78 4.05c1.27-1.11 2.97-2.38 3.46-4.05z"/>
                                <path d="M83.04 0h217.33c-.36 15.74-.06 32.17-.15 48-.26 1.29.5 2.48 1.78 2.58 8.04.02 15.99-.23 24 .68 2.48.32 5.06.06 7.55.2 1.89 1.39 5.19.85 7.45.96 3.99 2.1 8.99 1.85 13.42 3.12 3.66.68 8.13 2.01 12.12 1.92 1.41 1.52 3.11 1.58 5.02 2 3.38 1.22 5.87 2.11 9.44 2.62 3.07 1.13 6.71 2.04 9.56 3.38 3.73 1.65 8.88 2.26 11.9 5.08 2.2.07 4.19.77 6 2 4.24.84 7.86 4.03 12.08 4.92.77 1.42 1.87 1.05 2.91 2.08 3.96 1.71 8.52 4.35 12.1 5.92.84 1.5 2.22 1.41 3.49 2.32 4 2.64 8.43 5.05 12.53 7.68.53.85 1.34 1.41 2.43 1.68 2.31 1.4 3.93 3.42 6.54 4.32 1.2 2.31 4.75 2.73 5.92 5.08 2.99 1.39 5.31 4.21 8.18 5.85 3.05 3.05 6.45 5.41 9.49 8.4 2.81 1.89 4.56 4.94 7.41 6.67 2.64 3.45 6.18 5.76 8.74 9.27 4.76 4.22 8.46 9.57 12.87 14.17 3.1 4.49 7.04 8.39 9.8 13.1 2.21 2.59 3.62 5.16 5.9 8 .35 1.85 1.8 2.1 2.44 3.78 1.72 2.44 3.04 5.7 5.25 7.67.88 2.86 2.83 5.37 3.92 8.09 2.6 2.27 3.31 6.65 5.34 9.52 2.42 5.42 6.01 10.81 7.66 16.49 1.04 1.91 1.96 3.76 2 5.99 2.19 2.05 2.26 6.12 3.9 8.27 2.04 7.33 4.92 13.64 6.6 21.19.9 2.07 1.06 5.43 2.58 7.45-.26 2.87 1.02 5.25.92 8.09 1.11 1.57.89 3.22 1 5 1.61 2.67.59 5.4 2.08 7.91.14 1.54-.25 2.77 1 4 .17 2.77-.33 6.51 1 9-.13 4.24.45 8.33.62 12.55.52 5.82.11 11.71.3 17.55.44.73.95 1.13 1.54 1.19 15.99-.03 32.01.07 48-.05l1 .39v217.38c-2.02-.43-3.98-1.54-5.43-3.01-2.89-1.02-4.08-3.17-7.11-3.91-.7-.65-1.34-1.34-1.91-2.08-3.06-1.32-5.95-4.02-9.09-4.92-4.26-4.36-11.87-7.82-16.46-11.31-10.91-6.7-23.89-15.62-35.05-22.18-4.77-3.76-10.7-7.12-15.95-10.31-2.58-1.81-5.53-4.15-8.54-5.2-2.27-2.59-5.65-3.41-7.92-6.08-1.51-.26-2.6-1.23-3.82-2.12-1.5-.73-3.23-1.44-4.18-2.88-3.94-1.35-6.36-4.1-9.9-6.05-1.37-1-2.86-1.77-4.1-2.95-2.42-.29-2.31-2.07-4.49-2.63-2.7-1.93-5.91-3.27-8.44-5.41-4.55-2.16-10.82-7.42-15.47-9.68-1.22-.97-1.99-1.98-3.68-2.2-1.85-2.1-5.19-2.94-6.91-5.08-2.2-.72-2.83 1.03-5.1 1-2.16 1.61-4.8 1.56-6.91 3.08-3.29.65-5.56 2.75-9.09 2.92-1.43.98-3.33 1.57-5 2-6.35 2.51-13.1 5.03-19.51 7.31-3.32.7-5.58 2.86-8.94 3.41-2.42.18-4.51 2.44-7 2.63-6.95 2.21-17.2 6.57-25 9.22-3.38.57-6.66-3.87-10-4.35-3.66-2.33-7.04-3.46-10.36-6.28-2.57-.93-4.72-2.9-7.19-3.86-2.58-2.46-6.27-3.67-8.8-6.16-2.25-1.4-4.63-2.45-6.61-4.42-2.96-1.73-6.27-3.77-8.92-6.07-9.11-6.13-18.52-13.83-27.31-20.6-1.45-.64-2.31-1.6-3.17-2.89-3.3-2.3-6.32-5.41-9.64-7.72-1.28-.44-2.57-2.19-3.28-3.34-3.17-2.21-5.64-5.11-8.59-7.56-8.52-8.08-16.66-15.55-24.78-24.11-5.66-6.49-12.33-12.63-17.68-19.39-1.46-.82-2.21-1.52-2.85-3.08-5.4-5.69-9.86-12.13-15.05-17.97-2.23-2.78-3.74-5.5-6.31-7.69-2.39-4.59-6.73-8.32-9.02-12.98-3.59-4.45-8.78-11.64-11.32-16.6-3.45-3.74-6.06-9.9-9.12-13.96-1.08-.68-.76-2.3-1.78-3.17-1.73-2.63-3.85-5.31-4.68-8.37l-1.08-.91c-.47-2.2-2.18-3.97-2.92-6.1-1.39-1.93-2.35-3.57-1-5.9.77-4.01 2.93-7.22 3.92-11.11 1.27-1.95 1.07-5.61 3.08-6.9.53-5.1 4.15-10.57 5.24-15.54 1.61-2.45 1.02-4.83 2.63-7 1.68-4.41 4.35-9.93 5.05-14.55 1.94-2.58 2.38-6.23 4.08-8.9.1-3.61 2.4-5.63 2.92-9.09 1.23-4.42 3.84-6.89 3.83-11.46-1.42-2.79-3.28-5.48-4.99-8-2.87-5.37-8.73-12.88-10.76-17.54-3-2.94-4.41-7.06-7.21-10.46-1.99-2.6-3.23-6.53-5.87-8.46-.54-2.31-2.12-3.74-3.12-5.85-1.44-1.28-1.21-3.18-2.89-4.13-1.21-2.76-2.69-5.04-4.99-7.02-.43-2.86-2.9-4.01-3.52-6.54-1.67-2.77-5.04-7.2-6.4-10.54-2.82-2.26-4.16-6.69-6.49-9.51-4.49-6.26-8.15-13.03-12.6-19.39-2.68-4.81-5.32-8.1-7.75-12.56-.21-1.29-2.14-1.83-2.42-3-1.93-4.25-5.47-8.2-7.37-12-6.88-10.08-12.76-20.11-19.64-30.13-.58-1.12-1.94-2.59-1.23-3.87z" fill="transparent"/>
                                <path fill="#ffffff" d="M300.37 0h7.08v.54c2.84.09 5.7.02 8.55.04.99-.12 1.81.2 2.46.96 4.5.11 9.03-.05 13.54.1.95-.02 1.77.28 2.45.9 2.43.2 5.91-.43 8 1 6.78-.47 12.15 1.61 18.55 2.29 20.74 3.97 38.67 9.21 58.33 16.79 1.94 1.71 5.61 2.62 8.21 2.84 1.02 1.72 3.65 2.18 5.37 2.85 5.26 2.79 12.08 5.12 16.53 8.23 4.04 2.11 8.9 4 12.4 6.72 5.42 3.02 10.89 6.47 16.15 9.74 1.16 1.49 3.62 1.88 4.83 3.22 2.99 2.79 5.65 3.57 8.62 6.33.65.38 1.35.68 2.1.91 1.02 2.02 2.82 2.35 4.46 3.64 1.73 1.08 2.35 2.89 4.54 3.36 2.88 3.04 6.69 5.45 9.66 8.36 2.42.89 3.08 3.33 5.36 4.64 1.89 2.82 4.96 3.86 6.71 6.54.57 1.78 2.11 1.47 3.01 2.72 4.04 3.61 7.63 7.73 11.46 11.57 1.59 2.95 5.38 4.86 6.72 8.25 1.35 1.43 3.02 2.12 4.1 3.91 1.22 2.53 3.95 4.15 5.29 6.55 1.19 2.24 2.97 3.63 4.69 5.46.39 2.21 2.38 3.08 2.92 5.09 3.26 3.14 5.17 7.32 8.2 10.72 1.43 1.42.9 3.18 2.88 4.19 3.73 6.93 8.32 13.24 11.73 20.54 2.83 3.65 4.58 9.55 7.39 13.23 2.39 6.27 6.78 13.6 8.8 20.34 2.21 5.79 5.94 12.87 7 18.98 2.15 4.82 3.25 9.35 4.79 14.38 1.09 4.26 3.15 10.06 3.53 14.07.98 3.92 2.47 8.54 2.68 12.55 1.24 2.9.45 5.99 2.08 8.9.01 3.6 1.03 6.96.89 10.55-.32 1.61.81 2.4.71 4 .9 3.01-.67 6.63 1.21 9 .16 3.18 0 6.37.11 9.55.62.66.92 1.48.91 2.45.12 5.17-.03 10.37.09 15.54l.54.5v3.04l-1-.39c-15.99.12-32.01.02-48 .05-.59-.06-1.1-.46-1.54-1.19-.19-5.84.22-11.73-.3-17.55-.17-4.22-.75-8.31-.62-12.55-1.33-2.49-.83-6.23-1-9-1.25-1.23-.86-2.46-1-4-1.49-2.51-.47-5.24-2.08-7.91-.11-1.78.11-3.43-1-5 .1-2.84-1.18-5.22-.92-8.09-1.52-2.02-1.68-5.38-2.58-7.45-1.68-7.55-4.56-13.86-6.6-21.19-1.64-2.15-1.71-6.22-3.9-8.27-.04-2.23-.96-4.08-2-5.99-1.65-5.68-5.24-11.07-7.66-16.49-2.03-2.87-2.74-7.25-5.34-9.52-1.09-2.72-3.04-5.23-3.92-8.09-2.21-1.97-3.53-5.23-5.25-7.67-.64-1.68-2.09-1.93-2.44-3.78-2.28-2.84-3.69-5.41-5.9-8-2.76-4.71-6.7-8.61-9.8-13.1-4.41-4.6-8.11-9.95-12.87-14.17-2.56-3.51-6.1-5.82-8.74-9.27-2.85-1.73-4.6-4.78-7.41-6.67-3.04-2.99-6.44-5.35-9.49-8.4-2.87-1.64-5.19-4.46-8.18-5.85-1.17-2.35-4.72-2.77-5.92-5.08-2.61-.9-4.23-2.92-6.54-4.32-1.09-.27-1.9-.83-2.43-1.68-4.1-2.63-8.53-5.04-12.53-7.68-1.27-.91-2.65-.82-3.49-2.32-3.58-1.57-8.14-4.21-12.1-5.92-1.04-1.03-2.14-.66-2.91-2.08-4.22-.89-7.84-4.08-12.08-4.92-1.81-1.23-3.8-1.93-6-2-3.02-2.82-8.17-3.43-11.9-5.08-2.85-1.34-6.49-2.25-9.56-3.38-3.57-.51-6.06-1.4-9.44-2.62-1.91-.42-3.61-.48-5.02-2-3.99.09-8.46-1.24-12.12-1.92-4.43-1.27-9.43-1.02-13.42-3.12-2.26-.11-5.56.43-7.45-.96-2.49-.14-5.07.12-7.55-.2-8.01-.91-15.96-.66-24-.68-1.28-.1-2.04-1.29-1.78-2.58.09-15.83-.21-32.26.15-48z"/>
                                <path d="M307.45 0H626v323.04l-.54-.5c-.12-5.17.03-10.37-.09-15.54.01-.97-.29-1.79-.91-2.45-.11-3.18.05-6.37-.11-9.55-1.88-2.37-.31-5.99-1.21-9 .1-1.6-1.03-2.39-.71-4 .14-3.59-.88-6.95-.89-10.55-1.63-2.91-.84-6-2.08-8.9-.21-4.01-1.7-8.63-2.68-12.55-.38-4.01-2.44-9.81-3.53-14.07-1.54-5.03-2.64-9.56-4.79-14.38-1.06-6.11-4.79-13.19-7-18.98-2.02-6.74-6.41-14.07-8.8-20.34-2.81-3.68-4.56-9.58-7.39-13.23-3.41-7.3-8-13.61-11.73-20.54-1.98-1.01-1.45-2.77-2.88-4.19-3.03-3.4-4.94-7.58-8.2-10.72-.54-2.01-2.53-2.88-2.92-5.09-1.72-1.83-3.5-3.22-4.69-5.46-1.34-2.4-4.07-4.02-5.29-6.55-1.08-1.79-2.75-2.48-4.1-3.91-1.34-3.39-5.13-5.3-6.72-8.25-3.83-3.84-7.42-7.96-11.46-11.57-.9-1.25-2.44-.94-3.01-2.72-1.75-2.68-4.82-3.72-6.71-6.54-2.28-1.31-2.94-3.75-5.36-4.64-2.97-2.91-6.78-5.32-9.66-8.36-2.19-.47-2.81-2.28-4.54-3.36-1.64-1.29-3.44-1.62-4.46-3.64-.75-.23-1.45-.53-2.1-.91-2.97-2.76-5.63-3.54-8.62-6.33-1.21-1.34-3.67-1.73-4.83-3.22-5.26-3.27-10.73-6.72-16.15-9.74-3.5-2.72-8.36-4.61-12.4-6.72-4.45-3.11-11.27-5.44-16.53-8.23-1.72-.67-4.35-1.13-5.37-2.85-2.6-.22-6.27-1.13-8.21-2.84C399.67 15.04 381.74 9.8 361 5.83c-6.4-.68-11.77-2.76-18.55-2.29-2.09-1.43-5.57-.8-8-1-.68-.62-1.5-.92-2.45-.9-4.51-.15-9.04.01-13.54-.1-.65-.76-1.47-1.08-2.46-.96-2.85-.02-5.71.05-8.55-.04V0z" fill="transparent"/>
                                <path fill="#ffffff" d="M300.36 101.23c.67-.55 1.55-.77 2.64-.65 8.53.21 16.99.89 25.54.88 2.83 2.5 8.48 1.29 11.46 2.54 2.46 1.12 4.91.14 7.44 1.54 5.68.75 13.13 3.61 19.56 4.74 4.08 1.99 9.13 3.36 13.46 5.26 3.45.51 5.47 2.76 9.08 2.92 1.03 1.64 3.61 2.2 5.32 2.86 5.78 3.04 13.75 6.01 18.6 10.22 2.12.36 3.41 1.69 4.99 3 4.36 1.72 6.37 3.85 9.95 6.03 1.68 1.81 4.11 2.39 5.78 4.24 4.71 3.75 11.86 8.9 15.85 13.19 1.04 1.33 2.99 1.49 3.43 3.54.74.11 1.38.47 1.91 1.07 1.67 2.12 4.04 3.1 5.56 5.39.97 1.69 3.23 2.66 3.53 4.54 2.87 1.93 4.41 4.77 7.08 6.92 7.36 9.4 14.95 18.72 20.81 29.21 2.05 2.21 2.81 5.96 5.19 7.78 1.33 3.31 3.15 5.63 3.92 9.1 1.85.99 1.2 3.12 2.42 4.5 1.26 1.13 1.04 2.73 1.91 4 1.45 3.25 3.45 5.75 3.67 9.5 1.53 1.63 1.44 3.52 2.37 5.45 2.02 4.39 2.08 7.3 3.9 11.04 1.85 5.76 3.13 13.55 4.97 19.02 1.78 8.39 2.03 12.86 3.04 21 1.42 7.24.32 15.09.72 22.48 1.8 1.48.58 3.13-1.46 2.89-15.33-.01-30.67 0-46-.01-1.09-.29-1.57-1.1-1.42-2.42-.01-3.67 0-7.33 0-11-1.08-2.97-.96-6.35-1.04-9.55-1.37-1.2-.81-2.44-1-4-1.47-2.91-.35-5.94-2.08-8.9-.11-1.43-.14-2.79-1-4-.09-3.57-1.89-6.5-1.92-10.1-3.08-5.95-5.56-15.91-8.83-22.45-2.72-3.28-3.59-8.14-5.99-12-3.18-4.34-4.88-8.53-8.36-13.27-2.11-4.02-6.14-7.22-7.82-11.27-2.63-1.9-3.82-4.61-6.17-6.82-2.91-2.37-4.76-5.68-7.91-8.1-1.89-2.89-5.04-4.12-7.1-6.91-3.72-3.23-7.11-6.17-11.17-8.91-4.25-4.01-8.51-6.21-13.5-9.33-4.99-2.38-7.03-5.16-12.42-6.75-1.42-1.15-2.97-1.91-4.82-2.1-1.24-1.99-4.55-2.29-6.45-3.41-5.89-2.5-12.86-4.59-18-6.71-3.42-.15-6.15-1.93-9.54-1.88-1.23-.96-2.53-.94-4-1-2.91-1.69-6.02-.79-8.91-2.08-1.54-.13-2.76.22-4-1-7.67-.29-15.2-.93-23.09-.92-.27-1.14-.37-2.32-.28-3.54.14-14.92-.22-31.03.18-45.77z"/>
                                <path d="M0 175.56l.75.5c.76 3.27.65 7.18.71 10.5 1.55 2.33.71 6.26 1 8.98 1.8 1.4.3 3.14 1.35 4.5 1.22 5.54 2.9 12.99 3.65 18.52.89 1.23.88 2.54 1 3.99.85 1.24.9 2.56 1 4 1.12 2.29 1.37 5.08 2.26 7.45 1.23 1.82 1.11 4.35 1.74 6.57 1.97 4.4 2.7 9.71 5.08 13.88.09 3.33 2.02 5.48 2.77 8.55 4.73 11.03 8.99 23.59 14.51 34.06 1.69 2.51 2.39 6.39 4.72 8.4.08 2.7 1.93 4.07 2.53 6.54 1.48 3.15 3.92 7.51 5.72 11.05 1.87 2.16 2.63 5.61 4.75 7.41 1.26 4.1 4.02 6.54 5.68 10.39 1.38 1.96 2.13 5.34 4.32 6.61 2.06 5.01 4.52 7.31 7.19 11.54.73 2.44 3.04 4.15 3.73 6.54 1.87 1.14 2.18 3.92 4.08 4.92.48 1.89 2.05 4.09 3.27 5.54.89 2.89 3.74 4.27 4.97 7.05 4.24 4.9 6.48 9.13 10.02 13.07 1.54 3.28 5.11 6.05 6.84 9.2.76 1.21 1.44 2.68 2.9 3.14 2.32 4.26 7.13 8.9 10.18 12.54.77 1.84 2.73 2.79 3.73 4.55 1.22 2.12 3.33 3.34 4.58 5.45 1.86 2.8 4.6 4.7 6.32 7.62 7.98 8.11 15.22 15.84 22.93 24.17.85.54 2.22 1.06 2.41 2.21 1.64 2.62 4.05 3.91 5.85 5.46.64 2.22 3.32 2.59 4.35 4.54 2.82 3.06 6.31 5.79 9.29 8.86.69.8 1.47 1.33 2.36 1.6.64 1.73 2.5 2.95 3.74 4.27 2.62 2.18 4.56 5 7.44 6.59 4.45 4.46 9.84 8.14 14.34 12.5 2.72 1.26 5.17 4.6 7.4 6.72 1.61.3 2.91 1.85 4.18 2.85 3.22 3.2 7.2 5.24 10.54 8.33 1.7.61 1.97 2.08 3.82 2.45 3.31 3.38 7.67 5.36 11.1 8.6 4.57 3.03 6.92 5.7 11.85 8.41 4.6 3.47 7.35 4.33 11.96 8.05 4.75 2.29 7.58 5.34 12.81 8.12 2.78 2.75 7.22 3.45 9.73 6.19 2.23.4 3.34 2.16 5.44 2.74 3.27 1.37 4.2 3.04 7.65 4.18 2.36 2.09 5.64 2.91 7.92 5.08 3.85 1.63 8.09 3.1 11.49 5.58 7 2.75 13.42 6.73 20.43 9.47 4.23 1.98 10.13 3.49 14.07 5.95 4.42 1.25 9.33 3.26 13.55 5.17 4.28.69 6.75 2.72 11 3.53 3.4 1.2 6.45 2.42 10 3.06 12.3 3.91 24.21 6.54 37 8.68 1.19.57 2.68.54 3.46 1.56 2.86.14 5.69-.16 8.54.31 2.89 1.65 6.8-.07 9.96 1.37l-.01.78H0V175.56z" fill="transparent"/>
                                <path fill="#ffffff" d="M300.46 200.46c4.02-.06 8.07-.06 12.08 0 1.61 1.73 3.43.32 5.46 1.61 4.74.35 10.77 1.53 15 3.51 5.77.61 11.61 3.39 17 5.43 3.76 1.23 7.82 4 11.55 5.45 1.56 2.34 4.81 2.31 6.68 4.3 1.77 1.16 2.71 2.74 4.7 3.39 4.77 3.34 9.55 7.11 13.53 11.39 3 1.63 3.86 4.48 6.54 6.46 2.37 2.27 4.09 5.2 6.54 7.46 1.8 3.37 4.49 6.26 6.48 9.54 2.16 3.94 4.28 7.57 6.52 11.46.64 1.57.41 3.08 2 3.99.74 3.37 2.69 6.16 3.47 9.55 1.84 5.15 3.47 11.6 4.92 17 1.02 3.63.59 9.41 2.61 12.46.06 4.01.06 8.06 0 12.08-4.47.43-9.05.1-13.54.2-12.02-.13-24.62.26-36.54-.2-.54-3.92-.6-8.11-.92-12.09-1.3-2.31-.27-4.74-2.08-6.9-.04-3.22-2.12-5.66-1.92-9.09-1.55-.36-1.65-1.69-2-3-1.13-1.89-2.2-3.97-3-6.02-1.52-.83-1.31-2.28-2.36-3.49-4.99-7.18-10.93-14.09-18.18-19.24-2.54-2.3-5.43-3.32-8-5.47-2.37-1.5-5.3-2.01-7.45-3.78-3.41-.74-6.62-2.77-10.1-2.92-4.58-2.19-10.08-1.95-15-2-1.27-1.11-2.49-.52-3.99-1-.21-.82-.29-1.66-.25-2.54.01-15-.01-30 .02-45-.04-.88.03-1.72.23-2.54z"/>
                                <path d="M626 545.04V626H472.96l.5-.54c6.7-.16 13.91.33 20.54-1.04 5.37-.22 9.69-1.43 14.55-1.88 2.52-1.32 5.28-.55 7.9-2.08 1.98.2 2.66-1.4 4.55-1.05 5.57-1.82 9.87-2.49 15.45-4.95 3.97-.93 7.58-3.78 11.5-4.73 4.86-2.54 10.51-4.52 14.5-8.27 3.26-1.12 5.27-3.86 8.21-4.82 2.58-2.39 5.69-4.28 8.4-6.54 14.38-12.85 28.75-28.58 42.87-42.1.96-.96 2.54-3.56 4.07-2.96z" fill="transparent"/>
                            </svg>
                        </div>
                        <p className="sub-heading">{ t('step1.heading') }</p>
                        <p className="description">{ t('step1.text') }</p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg className="step-2" viewBox="0 0 78 81" height="108" width="104" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h78v81h-.07c-1.3-3.21-2.71-6.37-4.13-9.52-1.72.88-3.41 1.84-5.13 2.74-7.68-2.97-15.41-5.86-23.03-9.01 5.09-2.06 10.13-4.24 15.2-6.34 2.48-1.39 5.24.5 7.79 1.05-.79-1.83-1.6-3.65-2.39-5.47-4.92.01-9.88-.15-14.79.12 1.57.5 3.14.99 4.71 1.48-3.4 1.37-6.83 2.7-10.27 3.99.09-11.8-.27-23.64.16-35.44l1.34 1.12c.73 5.66-.08 11.61.56 17.31.85 2.34 4.22 2.08 4.56-.43.3-6.1.27-12.35.07-18.46-.12-4.3-3.7-6.96-7.58-7.85-4.56-.92-9.76-1.02-14.14.71-2.97 1.19-5.31 3.65-5.39 6.99-.15 6.21-.34 12.51-.07 18.72.71 2.4 3.7 2.68 4.65.32.64-5.7-.17-11.63.56-17.3l1.34-1.14c.44 11.8.07 23.64.16 35.45-3.43-1.29-6.85-2.62-10.26-3.99 1.57-.49 3.13-.97 4.69-1.48-4.91-.27-9.86-.12-14.78-.12-.79 1.83-1.6 3.65-2.39 5.48 2.53-.55 5.33-2.45 7.79-1.06 5.07 2.09 10.1 4.29 15.19 6.35-7.6 3.14-15.31 6.02-22.98 9-1.74-.9-3.45-1.85-5.21-2.72C2.74 74.65 1.41 77.84.02 81H0V0z" fill="transparent"/>
                                <path fill="#ffffff" d="M35.27 1.25c2.5-1.55 4.95-1.53 7.45.01 3.62 2.28 4.19 7.68 1.33 10.78-2.55 2.99-7.56 2.99-10.11.01-2.85-3.12-2.33-8.53 1.33-10.8zM45 16.29c3.88.89 7.46 3.55 7.58 7.85.2 6.11.23 12.36-.07 18.46-.34 2.51-3.71 2.77-4.56.43-.64-5.7.17-11.65-.56-17.31l-1.34-1.12c-.43 11.8-.07 23.64-.16 35.44 3.44-1.29 6.87-2.62 10.27-3.99-1.57-.49-3.14-.98-4.71-1.48 4.91-.27 9.87-.11 14.79-.12.79 1.82 1.6 3.64 2.39 5.47-2.55-.55-5.31-2.44-7.79-1.05-5.07 2.1-10.11 4.28-15.2 6.34 7.62 3.15 15.35 6.04 23.03 9.01 1.72-.9 3.41-1.86 5.13-2.74 1.42 3.15 2.83 6.31 4.13 9.52H56.27c1.99-1.04 3.94-2.17 5.9-3.26-7.69-3.28-15.39-6.6-23.17-9.66-7.78 3.06-15.47 6.38-23.17 9.66 1.97 1.09 3.92 2.21 5.91 3.26H.02c1.39-3.16 2.72-6.35 4.14-9.5 1.76.87 3.47 1.82 5.21 2.72 7.67-2.98 15.38-5.86 22.98-9-5.09-2.06-10.12-4.26-15.19-6.35-2.46-1.39-5.26.51-7.79 1.06.79-1.83 1.6-3.65 2.39-5.48 4.92 0 9.87-.15 14.78.12-1.56.51-3.12.99-4.69 1.48 3.41 1.37 6.83 2.7 10.26 3.99-.09-11.81.28-23.65-.16-35.45l-1.34 1.14c-.73 5.67.08 11.6-.56 17.3-.95 2.36-3.94 2.08-4.65-.32-.27-6.21-.08-12.51.07-18.72.08-3.34 2.42-5.8 5.39-6.99 4.38-1.73 9.58-1.63 14.14-.71z"/>
                                <path fill="#ffffff" d="M39.94 41.76c.07 6.42.18 12.87 0 19.29.11.93-.48 1.61-1.78 2.05-.28-5.35-.11-10.73-.21-16.1.37-2.31-1.06-4.65 1.99-5.24z" />
                                <path fill="transparent" d="M39 68.08c7.78 3.06 15.48 6.38 23.17 9.66-1.96 1.09-3.91 2.22-5.9 3.26H21.74c-1.99-1.05-3.94-2.17-5.91-3.26 7.7-3.28 15.39-6.6 23.17-9.66z"/>
                            </svg>
                        </div>
                        <p className="sub-heading">{ t('step2.heading') }</p>
                        <p className="description">{ t('step2.text') }</p>
                    </div>
                </div>
                <div className="row-2">
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg className="step-3" viewBox="0 0 95 95" height="95pt" width="95pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h95v95H0V0z" fill="#C04C9C"/>
                                <path d="M20.01 5c.23 3.78.23 8.27 0 12.06-.49 2.61-3.79 3.16-5.13.85-.56-2.2-.27-4.65-.34-6.91.09-2.25-.26-4.75.39-6.91 1.45-2.13 4.5-1.54 5.08.91zM60.93 2.76c1.97-.13 3.41 1.13 3.3 3.16.02 3.96.26 8.03-.2 11.97-1.46 1.92-3.7 2.05-5.06-.03-.44-2.22-.24-4.6-.29-6.86.38-2.71-1.19-7.24 2.25-8.24z" fill="#ffffff"/>
                                <path d="M11.69 13.66c.2 2.29-.21 4.44 1.32 6.34 2.12 2.69 6 2.77 8.35.34 1.8-1.83 1.32-4.17 1.55-6.54 10.97-.01 21.93-.01 32.89 0 .27 2.38-.09 4.87 1.76 6.67 2.22 2.17 5.66 2.17 7.87-.02 1.91-1.84 1.35-4.32 1.59-6.75 3.91-.06 7.37.89 8.15 5.21.33 7.48.01 15.02.14 22.51h-5.57c0-3.67.01-7.34.04-11.01-20.24-.03-40.49-.04-60.73.01.17 12.88-.06 25.77.12 38.65 11.02.02 22.03 0 33.05.01-.04 1.85-.07 3.69-.1 5.54-10.98-.21-21.99.08-32.96-.14-3.34-.11-5.83-3.15-5.62-6.44-.06-15.33.04-30.71-.04-46.04.08-2.25-.12-4.25 1.49-6.05 1.82-2.2 4.08-2.02 6.7-2.29z" fill="#ffffff"/>
                                <path d="M14.57 35.86H25.6c0 3.67.01 7.34.02 11.01-3.68.03-7.37.04-11.06.02 0-3.68 0-7.36.01-11.03zM31.17 35.86c3.67-.01 7.34-.01 11.01 0 .01 3.68.01 7.36.01 11.03-3.68.01-7.36.01-11.05-.01l.03-11.02zM47.68 35.86h11.03c.01 3.67.02 7.34.02 11.01-3.68.03-7.37.04-11.05.02V35.86zM64.46 47.61c12.54-3.27 25.56 5.6 27.17 18.42 1.68 11.46-6.29 22.54-17.64 24.65-11.87 2.49-23.9-5.81-25.95-17.71-2.19-11.29 5.29-22.7 16.42-25.36zM25.64 52.49c-.04 3.67-.05 7.33 0 11-3.7.01-7.4.01-11.1 0 .03-3.67.03-7.33-.01-11 3.71-.03 7.41-.04 11.11 0zM31.11 52.49c3.7-.03 7.4-.03 11.1 0-.03 3.66-.03 7.33-.01 11-3.7.02-7.4.01-11.1-.02.07-3.66.08-7.32.01-10.98z" fill="#ffffff"/>
                                <path d="M65.18 53.12c6.25-1.86 13.22.33 17.32 5.36 4.2 4.98 5.02 12.23 2.02 18.03-3.23 6.4-10.46 10.1-17.56 8.83-7.45-1.24-13.34-7.76-13.71-15.32-.56-7.62 4.61-14.83 11.93-16.9z" fill="#C04C9C"/>
                                <path d="M80.78 63.17c2.16 1.21 1.87 3.32.22 4.84-4.35 4.16-8.31 8.86-13.08 12.54-3.41-2.17-5.71-5.06-8.63-7.85-.85-.99-2.32-2.11-2.05-3.56.27-1.91 2.8-3.31 4.34-1.78 2.25 1.81 4.17 4.05 6.24 6.06 2.92-2.95 5.82-5.93 8.78-8.84 1.26-1.06 2.41-2.49 4.18-1.41z" fill="#ffffff"/>
                            </svg>
                        </div>
                        <p className="sub-heading">{ t('step3.heading') }</p>
                        <p className="description">{ t('step3.text1') }</p>
                        <p className="description">{ t('step3.text2') }</p>
                    </div>
                    <div className="step-wrapper">
                        <div className="circle">
                            <svg className="step-4" viewBox="0 0 287 230" height="230pt" width="287pt" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h287v230H0V0z" fill="transparent"/>
                                <path fill="#ffffff" d="M41.98 15.01c67.22-.03 134.89.02 202.06-.03 7.69-.14 14.5 6.18 15.24 13.76.82 3.73.36 7.38.61 11.2.04 22.37.05 44.75 0 67.12-.51 4.77.08 9.42-.28 14.19.36 3.14.33 5.89 0 9.03.17 8.41.55 16.8.18 25.21-.02 4.79-.17 10.38-2.77 14.56-1.88 3.54-6.62 5.46-10.19 6.83-3.25.3-6.56.08-9.83.12H42.99c-8.24-.27-15.24-7.71-15.01-15.96.06-43.6 0-87.42.02-131.05.31-6.95 6.81-14.63 13.98-14.98z"/>
                                <path d="M145.5 20.23c.82.96 1.61 1.95 2.4 2.93-1.04.89-2.17 2.73-3.7 2.5-1.67-.15-2.09-1.5-3.1-2.62 1.4-2.1 1.88-2.63 4.4-2.81zM52.6 30.66c60 .01 120 0 180 .01 4.01.01 8.05-.11 12.04.16-.98 4.12-.59 7.97-.64 12.17 0 21.35.01 42.7-.01 64.04-.1 3.47.71 6.71.21 10.16-.49 4.21-.07 8.34.19 12.54-.66 7.1-.3 14.14-.4 21.25.03 3.64-.24 7.06.54 10.59-1.31-.16-2.62-.22-3.93-.25-63.59 0-127.21.02-190.8-.01-2.28-.02-4.54-.01-6.8.31-.01-43.57.01-87.16-.01-130.73 3.15-.44 6.43-.21 9.61-.24z" fill="#C04C9C"/>
                                <path fill="#ffffff" d="M141.56 51.25c4.75 0 10.03-.42 14.57 1.11 3.04.84 5.57 2.33 8.53 3.63 2.36.91 3.31 3.25 5.47 4.69 1.75 1.24 3.44 2.26 4.52 4.19 2.8 4.53 5.37 9.47 6.52 14.7 2.78-.06 8.04-1.41 9.51 1.73 2.38 5.44 1.49 12.16-.98 17.41-.69 1.45-1.18 1.66-2.68 2.07 1.46 4.08 4.23 7.72 5.52 11.83-1.08 1.88-2.12 3.81-3.37 5.58-2.16 2.62-4.94 4.72-7.35 7.12-3.63 3.34-7.99 4.99-12.31 7.22-3.72 1.68-7.79 2.01-11.52 3.7 2.26-2.61 3.87-5.57 5.83-8.41 2.57-3.58 2.98-8.01 5.21-11.84-5.29 1.08-10.76.57-16.07 2.1-1.19.71-2.23 1.69-3.39 2.47-3.62.54-7.05-.02-10.52-1.07-.81-3.02-3.01-5.16-.81-8.1 4.21-1.96 8.18-1.32 12.67-1.38-.22.48-.45.96-.68 1.43 6.77.96 13.18-.43 19.86-.96 1.42-4.07.82-8.08.94-12.51.24-5.9-1.86-10.84-2.9-16.44-1.01-.9-1.99-1.82-2.99-2.73-5.89 4.34-13.25 6.88-20.37 8.24-6.19 1.67-12.48 3.07-18.75 4.4-2.84.52-5.96 1.31-8.31 3.04-2.06 7.77.26 14.56 1.7 22.13 1.05 3.36 2.35 6.87 3.99 9.98 2.23 2.96 4.51 5.8 6.03 9.23-5.3-1.32-11.11-2.6-15.92-5.22-3.85-3.24-8.47-5.45-11.98-8.97-2.13-3.04-5.49-5.34-6.56-8.76-.33-2.43 1.61-5.05 2.89-7 2.55-3.1 4.04-6.62 5.81-10.18 3.63-7.77 4.57-16.08 8.21-23.83 1.73-3.62 3.78-7.64 6.88-10.27 2.16-1.93 4.13-4.2 6.46-5.92 5.18-2.57 10.48-4.43 16.34-4.41zM40.99 182.01c54.35.01 108.71 0 163.06 0 1.76.03 3.51.2 5.26.38 12.46-.78 25.19-.2 37.72-.4 5.65.05 7.82 4.16 10.97 8.01 5.28 6.33 10.53 12.83 15.78 19.23 1.73 1.61 1.1 4.44 1.34 6.62-3.19 2.76-8.02 3.25-12.08 3.18-5.94-.15-11.4.38-17.18-.64-2.28.07-4.51.68-6.82.61-63.36-.03-126.73 0-190.09-.01-2.22.04-4.43-.46-6.64-.38-5.16.62-10.12.33-15.31.4-4.07-.03-7.81.43-11.64-1.33-2.06-1.64-4.46-3.26-3.06-6.22 3.11-4.8 7.34-8.81 10.7-13.47 3.52-4.17 7-8.35 10.29-12.71 1.74-2.51 4.85-3.07 7.7-3.27z"/>
                                <path fill="#C04C9C" d="M125.98 197.97c15.34.07 30.7.01 46.04.02 2.42-.09 4.22 1.18 6.4 2.09.31 2.94 1.68 5.76 1.64 8.7-.49 1.2-1.46 2.21-2.22 3.26-22.23-.09-44.57.05-66.78-.06-2.43.26-3.98-2.88-3.81-5.01.76-2.73 1.77-5.36 2.97-7.93 5.42.48 10.39-1.3 15.76-1.07z" />
                            </svg>
                        </div>
                        <p className="sub-heading">{ t('step4.heading') }</p>
                        <p className="description">{ t('step4.text1') }</p>
                        <p className="description">{ t('step4.text2') }</p>
                    </div>
                </div>
            </div>
        );
    }
}

HowItWorks.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('howItWorksView')(HowItWorks))

