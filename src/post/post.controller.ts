import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) {}

  @Post() 
  @UsePipes(new ValidationPipe())
  cratePost(@Body() post: CreatePostDto) {

    return this.postService.createPost(post)  }

}
