---
date: 2025-06-10
title: "Ergonomics"
description: "Elegant testing with Rails, Minitest, and Clearance"
---

# {{ $doc.title }}

## {{ $doc.description }}

As a developer, a primary focus of my development effort is spent on developer happiness. This is probably why I gravitate towards Ruby.

> Ruby is designed to make programmers happy.
>
> - Yukihiro "Matz" Matsumoto

In the spirit of shipping fast and developer happiness, if you don't want to read my long-winded bloviation and luke-warm takes [skip to the code](#are-you-mocking-me).

## The joys of programming

Recently I had the distinct pleasure of starting a green field project using Ruby on Rails. I can't express my excitement to type in `rails new` on the command line and see an application spin up in minutes. I decided to use this as an opportunity to explore some of the latest and greatest of Rails 8, and spelunk the depths of the unfamiliar parts of the ecosystem that I don't usually traverse.

## Traditionally I,

- Abandon Rails Views entirely in favor of a JavaScript framework like Vue or React, but lets take Hotwire for a spin and see how it goes.
- Test with RSpec, so for this project I want to see just how far I can get with the default, Minitest.
- Use Devise for authentication, but Rails 8 has a new [authentication generator](https://guides.rubyonrails.org/security.html), so lets give that a shot too.

## The Setup

I admit it, I cheated, I wrote a human readable specification and had Claude spit out 15 scaffold generators for me. MVP done, ship it 🚀.

## But wait, there's more!

Well we can't just ship a crud app, we need an authentication system. Following the guide [here](https://guides.rubyonrails.org/security.html) I was able to add authentication to my rails app in about 30 minutes. It's got most of what you need, views for the auth flow, session and password controllers, mail templates. Clicking around the app everything seemed mostly fine.

## Problems with the rails authentication generator

The first issue I noticed, was that there was no way to scaffold an auth that wasn't `User.email_address`. In fact, the generator clobbered my existing `create_users` migration! No worries, I can rename the migration and checkout the old one from version control. Let me swap out all my old users views to use `email_address`, update strong params, and drop the `email` column. Great, now we are cooking with gas, auth seems to be working, app secure. MVP done, ship it 🚀.

## But wait, there's _even_ more!

Let's just run the test suite and see how it goes. At this point, after a dozen rails scaffold generators, I already have a few hundred tests. Naturally, wrapping every route with a `before_action :require_authentication` in the `ApplicationController` is going to break every controller and system test. Woof, 70% of my test suite is failing. No worries, I tell myself, lets just get some helper methods to bypass auth for my speedy, speedy, tests.

## The Realization

There are no system test helpers. Your tests have to hit the login page like a real user back in 2010. I can already see it now, I'm going to push code, and CI is going to spin for 10 minutes hitting the login page over, and over, and over again while I browse Hacker News waiting to merge. This does not spark joy. Thankfully, Chris over at [gorails](//gorails.com) has a decent monkey patch to get the ball rolling. You can find out more in his [YouTube breakdown](https://www.youtube.com/watch?v=KFSpSJDHyu8). He even wrote the test helper to bypass the `sign_in` for controller tests [https://github.com/rails/rails/issues/53207](https://github.com/rails/rails/issues/53207).

## Non-viable

At this point, a judgement call was made. The Rails authentication is not a viable solution. It was shipped, without a reliable or pragmatic mechanism to test. I want to test my code. I _need_ to test my code. I _need_ to test authentication as a critical part of the application security model. It needs to be easy to test. Maybe I will revisit the default authentication generator in Rails 9, but as of this writing, it still needs more time to cook.

## Authentication, now on Clearance

After a `bin/rails db:rollback STEP=2` and a `git reset --hard` and a `git clean -f` and a `git clean -d`, I'm back to an unsecured application. Luckily, there is still another non-Devise auth solution on the table, enter [Clearace](https://github.com/thoughtbot/clearance).

## Installation

Easy, 30min delivery or its free ( its always free actually ) thanks to the homies over at thoughtbot. Shout out to [The Bikeshed](//bikeshed.fm). What I liked most about Clearance was the ease of install, the way it bolted onto my existing models via includes, and how they provided generators for everything: routes, controllers, views. This was exactly the lightweight extensible solution I was looking for.

## One, teeny, tiny, little, insignificant pet peeve

There is still the one rub, testing. Thankfully Clearance already ships with a middleware to make system testing functional, [BackDoor](https://github.com/thoughtbot/clearance/blob/main/lib/clearance/back_door.rb). This is a peice of middleware that you load in your `config/enviroments/test.rb` and looks for a magic `as: @user` parameter to bypass the authentication. This is a very reasonable solution, that fits well in the use case of Rack applications. The catch: every, single, authenticated path or url call needs to have a magic parameter on it.

Where you would normally write `get users_path` now has become `get users_path(as: @current_user)`. We are talking hundreds of test, that now have to be modified to stub out auth. This is painful. I'm comfortable with vim and sed, and I could do it sure. I might even be able to make Copilot do it for me. But am I really ok with, in perpetuity, modififying every, single, path, and url? Will I put this code down for a month and revisit it an even remember that's a thing? This is too much friction.

## Ergonomics

It's moments like these where I confront the icky feeling I have, there has to be a better way. The Clearance team has a good solution for bypassing auth, in the general case of Rack. I just find it tedious to use. I going to borrow another quote, usually about refactoring:

> First make the change easy, then make the easy change
>
> - Kent Beck

## Criteria for Success

What does a good solution look like here?

- Testing is as frictionless as possible
- I don't have to modify every `_path` and `_url` call
- I don't have to modify my `ApplicationController` polluting application code with `Rails.env.test?` and auth bypasses
- I can still test a legitamate authentication flow, and ensure application security
- The application behaves mostly normally, even while bypassing authentication

## The Code

Thank you for staying with me on my zero's journey. If you are still here you probably are more interested in rails testing and auth than 99.9% of all the humans that ever lived. I'm not going to belabor the post further with all the solutions that didn't work. They were usually some unholy monkey patch deep into the rails internals for path generation, failed attempts at runtime modifications and module prepending. All were ugly and broke one or more of the success criteria.

## Are you mocking me?

Yes, lets just mock the authentication.

```ruby
# Gemfile

group :test do
  # ...
  gem "mocha"
end
```

Lets make a test helper. This will simulate what an authenticated user looks like at the application level. This worked flawlessly for 99% of my test suite.

**Fair Warning** this will not handle cookies/sessions properly. If you need real cookies, or sessions, revert to using the Clearance Backdoor, or a proper visit to your login page.

**Code Smell** I am stubbing on `any_instance`, this is a small ick, but something I will just have to live with. It would be better to stub on the specific controller instance in the test, but I couldn't find an elegant way to get that from inside an arbitrary `ApplicationSystemTest` or `IntegrationTest`. I don't want to have to think about how to invoke `login` nor have to customize the arguments for every different test.

```ruby
# test/helpers/login_helper.rb

module LoginHelper
  def login(user = nil)
    # create a user by default, or just use the one provided
    current_user = user || FactoryBot.create(:user)

    # don't even challenge the request
    ApplicationController
      .any_instance
      .stubs(:require_login)
      .returns(nil)

    # you may need to stub additional methods in view/controller/application helpers
    # this depending on the contents of your views, and which helpers you are using
    ApplicationController
      .any_instance
      .stubs(:signed_in?)
      .returns(true)

    # if you are showing/scoping to a users' collection, or tracking whodunnit, you will need this
    ApplicationController
      .any_instance
      .stubs(:current_user)
      .returns(current_user)
  end
end
```

Lets add mocha and our login helper to our `test_helper.rb`

```ruby
# test/test_helper.rb

# ...after require "rails/test_help
require "mocha/minitest"
require_relative "helpers/login_helper"
# ...

module ActiveSupport
  class TestCase
    # ...
    include LoginHelper
  end
end

```

Thats it, lets look at how our tests read.

```ruby
# test/system/tasks_test.rb
require "application_system_test_case"

class TasksTest < ApplicationSystemTestCase
  setup do
    login # just works :tm:
    @task = create(:task)

    # alternatively, with a specific user instance
    # login(@task.owner)
  end

  test "visiting the index" do
    visit tasks_url
    assert_selector "h1", text: "Tasks"
  end
end
```

With our login helper in hand, I went about the business of updating all my tests, per-file, to use the succinct `login` method. I still reserve the right to login manually, use the backdoor, or only use the login on a per-test basis.

Now, with a green test suite, the application safely locked down behind authentication, and a painless testing experience, I can confidently say

# MVP done, ship it 🚀
