import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getBlogs } from '../../../actions/blog';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class Blog extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount () {
        this.props.dispatch(getBlogs());
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page blog">
                <Header location={this.props.location} />
                <div className="page-header"><h1>Blogovi</h1></div>
                <ul className="blog-list">
                {
                    this.props.blogs.map((blog, i) => {
                        return(
                            <li key={i} id={blog.hash} className="blog-item">
                                <div className="top-wrapper">
                                    <div className="author-wrapper">
                                        <img src={`/images/${blog.author.image}`} />
                                    </div>
                                    <div className="author-date-wrapper">
                                        <p className="author">Pisac: {blog.author.name}</p>
                                        <p className="author">Zvanje: {blog.author.title}</p>
                                        <p className="date">Datum: {blog.date}</p>
                                    </div>
                                </div>
                                <h2>{blog.title}</h2>
                                {
                                    blog.text.map((paragraph, j) => {
                                        if (j == blog.image[0].iterator) {
                                            return (
                                                <div>
                                                    <img className="blog-image" src={`/images/${blog.image[0].filename}`} />
                                                    {(() => {
                                                        if (paragraph.heading.length) {
                                                            return <h3 className="blog-sub-heading">{paragraph.heading}</h3>;
                                                        } else {
                                                            return null;
                                                        }
                                                    })()}
                                                    <p>{paragraph.textItem}</p>
                                                </div>
                                            );
                                        }
                                        return (
                                            <div>
                                                {(() => {
                                                    if (paragraph.heading.length) {
                                                        return <h3 className="blog-sub-heading">{paragraph.heading}</h3>;
                                                    } else {
                                                        return null;
                                                    }
                                                })()}
                                                <p>{paragraph.textItem}</p>
                                            </div>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
                </ul>
                <Footer />
            </div>
        )
    }
}

Blog.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    blogs: state.blog.list
});

export default connect(mapStateToProps)(translate('headerView')(Blog))

