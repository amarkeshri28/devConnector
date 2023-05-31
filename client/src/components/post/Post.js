import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { useParams } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading } }) => {
    const { id } = useParams();
    useEffect(() => {
        getPost(id);
    }, [getPost, id]);
    return (

        loading || post === null ? <Spinner /> : <Fragment>
            <Link to="/posts" className='btn'>Back to Posts</Link>
            <PostItem post={post} showAction={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>


    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, { getPost })(Post)