function addMetaFrom(post) {
  useSeoMeta({
    title: post.value?.title,
    description: post.value?.description
  });
}

async function fetchPost(path) {
  return await useAsyncData(() => {
    return queryCollection('content') // query the content collection
      .path(path) // drops the .md extension, and must begin with "/"
      .first()
  });
}

export async function content(path) {
  const { data: post } = await fetchPost(path);
  addMetaFrom(post);
  return post;
}