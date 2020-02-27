import React, {useState, useEffect} from 'react';
// import _ from 'lodash';
import axios from 'axios';
import './App.css';
// import Edit from './Edit'

function Comment() {
    
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState('');
    
    const handleDeleteComment = (id) => (e) => {
        e.preventDefault();
        axios.delete(`/comments/${comments[id]._id}`, () => {});
    }
    
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setNewComment(e.target.comment.value)
    }

    // const handleEditComment = (id) => (e) => {
    //     e.preventDefault();
    //     axios.put(`/comments/${comments[id]._id}`, () => {})
    // }
    
    useEffect(() => {
        if (newComment !== "") {
            axios.post('/comments', {
                comment: newComment,
                like: false
            })
        }
    }, [newComment]);

    useEffect(() => {
        axios.get('/comments').then((response) => {
            setComments(response.data);
        })
    }, [])




    function CommentForm({children}) {
        return(
            <div>
                <h3>enter a comment below</h3>
                <form onSubmit={handleCommentSubmit} action="POST">
                    <textarea name="comment" onSubmit={setNewComment} cols="80" rows="5"></textarea>
                    <br/>
                    <button>Submit</button>
                </form>
                {children}
            </div>
        )
    }

   if (!comments) {
       return (<CommentForm><p>Click a rover to see pictures!</p></CommentForm>)
   }

   return (
        <CommentForm>
           {comments.map((comments, id) => {
                return  <div onClick={handleDeleteComment(id)}>
                            <p alt='roverComments' 
                                className='rover-comments' 
                                key={comments.id_}>{comments.comment}</p>
                            {/* <button action="PUT">edit</button> */}
                            <button action="DELETE">delete</button>
                        </div>
            })}
        </CommentForm>
    )
}


export default Comment;