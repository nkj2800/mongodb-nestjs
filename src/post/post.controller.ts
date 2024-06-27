import { Body, Controller, Delete, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  cratePost(@Body() post: CreatePostDto) {

    return this.postService.createPost(post)
  }

  @Delete(':id')
  deletePost(@Body() {userId}: {userId: string}, @Param('id') id: string) {

    return this.postService.deletePost(userId, id)
  }

  @Delete()
  deleteAllPosts(@Body() {userId}: {userId: string}) {

    return this.postService.deleteAllPosts(userId)
  }

}
