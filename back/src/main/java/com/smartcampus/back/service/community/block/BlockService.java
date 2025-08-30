package com.smartcampus.back.service.community.block;

import com.smartcampus.back.dto.community.block.response.BlockedCommentListResponse;
import com.smartcampus.back.dto.community.block.response.BlockedPostListResponse;
import com.smartcampus.back.dto.community.block.response.BlockedReplyListResponse;
import com.smartcampus.back.dto.community.block.response.BlockedTargetResponse;
import com.smartcampus.back.entity.auth.User;
import com.smartcampus.back.entity.community.Block;
import com.smartcampus.back.entity.community.Comment;
import com.smartcampus.back.entity.community.Post;
import com.smartcampus.back.entity.community.Reply;
import com.smartcampus.back.global.exception.CustomException;
import com.smartcampus.back.global.exception.ErrorCode;
import com.smartcampus.back.global.security.SecurityUtil;
import com.smartcampus.back.repository.auth.UserRepository;
import com.smartcampus.back.repository.community.block.BlockRepository;
import com.smartcampus.back.repository.community.comment.CommentRepository;
import com.smartcampus.back.repository.community.comment.ReplyRepository;
import com.smartcampus.back.repository.community.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlockService {

    private final BlockRepository blockRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil; // ✅ 추가

    // ================== 게시글 ==================
    public void blockPost(Long postId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        Block block = blockRepository.findByUserAndPost(user, post)
                .orElse(Block.builder().user(user).post(post).build());

        block.restore();
        blockRepository.save(block);
    }

    public void unblockPost(Long postId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(ErrorCode.POST_NOT_FOUND));

        blockRepository.findByUserAndPost(user, post)
                .ifPresent(block -> {
                    block.softDelete();
                    blockRepository.save(block);
                });
    }

    public BlockedPostListResponse getBlockedPosts() {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        List<Block> blocks = blockRepository.findByUserAndPostIsNotNullAndIsDeletedFalse(user);
        return new BlockedPostListResponse(blocks.stream()
                .map(block -> new BlockedTargetResponse(block.getPost().getId(), "POST"))
                .collect(Collectors.toList()));
    }

    // ================== 댓글 ==================
    public void blockComment(Long commentId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        Block block = blockRepository.findByUserAndComment(user, comment)
                .orElse(Block.builder().user(user).comment(comment).build());

        block.restore();
        blockRepository.save(block);
    }

    public void unblockComment(Long commentId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        blockRepository.findByUserAndComment(user, comment)
                .ifPresent(block -> {
                    block.softDelete();
                    blockRepository.save(block);
                });
    }

    public BlockedCommentListResponse getBlockedComments() {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        List<Block> blocks = blockRepository.findByUserAndCommentIsNotNullAndIsDeletedFalse(user);
        return new BlockedCommentListResponse(blocks.stream()
                .map(block -> new BlockedTargetResponse(block.getComment().getId(), "COMMENT"))
                .collect(Collectors.toList()));
    }

    // ================== 대댓글 ==================
    public void blockReply(Long replyId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new CustomException(ErrorCode.REPLY_NOT_FOUND));

        Block block = blockRepository.findByUserAndReply(user, reply)
                .orElse(Block.builder().user(user).reply(reply).build());

        block.restore();
        blockRepository.save(block);
    }

    public void unblockReply(Long replyId) {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new CustomException(ErrorCode.REPLY_NOT_FOUND));

        blockRepository.findByUserAndReply(user, reply)
                .ifPresent(block -> {
                    block.softDelete();
                    blockRepository.save(block);
                });
    }

    public BlockedReplyListResponse getBlockedReplies() {
        User user = securityUtil.getCurrentUser(); // ✅ 변경
        List<Block> blocks = blockRepository.findByUserAndReplyIsNotNullAndIsDeletedFalse(user);
        return new BlockedReplyListResponse(blocks.stream()
                .map(block -> new BlockedTargetResponse(block.getReply().getId(), "REPLY"))
                .collect(Collectors.toList()));
    }
}
