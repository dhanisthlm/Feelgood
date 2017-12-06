import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getBlogs } from '../../../actions/blog';
import Header from '../Header/index';
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
                                <h2>{blog.title}</h2>
                                <p className="author">Pisac: {blog.author}</p>
                                <p className="date">Datum: {blog.date}</p>
                                <p>{blog.text}</p>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}

Blog.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    blogs: state.blog.list
});

export default connect(mapStateToProps)(translate('headerView')(Blog))

