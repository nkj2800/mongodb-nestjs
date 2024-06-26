import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createPost({ userId, ...post }: CreatePostDto) {
    const user = await this.userModel.findById(userId)

    if (!user) throw new HttpException("User not found", 404)

    const newPost = new this.postModel(post)
    const savedPost = await newPost.save()

    await user.updateOne({
      $push: {
        posts: savedPost._id
      }
    })
    return savedPost
  }

  async deletePost(userId: string, id: string) {
    const user = await this.userModel.findById(userId)

    if (!user) throw new HttpException("User not found", 404)

    await user.updateOne({
      $pull: {
        posts: id
      }
    }, { new: true })

    await this.postModel.findByIdAndDelete(id)

    return user
  }

  async deleteAllPosts(userId: string) {
    const user = await this.userModel.findById(userId)

    if (!user) throw new HttpException("User not found", 404)

    await user.updateOne({ $set: { posts: [] } }, { new: true })

    await this.postModel.deleteMany({})

    return user
  }
}


