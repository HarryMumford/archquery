import React from "react";
import { connect } from "react-redux";
import { createPost } from "../../../actions";
import PostForm from "../PostForm/PostForm";

class AnswerCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createPost({
      ...formValues,
      postTypeId: 2,
      ownerUserId: this.props.userId,
      parentId: this.props.questionId,
    });
  };

  render() {
    if (!this.props.userId) {
      return (
        <div className="component-answer-create-message">
          <p>To answer a question, you must sign up for an account.</p>
        </div>
      );
    }

    return (
      <div className="component-answer-create">
        <PostForm onSubmit={this.onSubmit} postTypeId={2} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps, { createPost })(AnswerCreate);
