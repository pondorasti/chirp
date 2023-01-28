# Chirp

## TODO
### widget

- [x] intents (retweet, like, comment)
- [x] tweet url unfurl
- [x] layout pixel peeping
- [x] image cards
- [x] gif/video cards
- [x] icon -> https://icon.ray.so/
- [x] twitter logo
- [x] bottom padding negative offset
- [x] new intent group
- [x] property menu
- [ ] description
- [ ] banner

### www
- [x] custom font
- [x] domain
- [x] analytics
- [x] twitter card
- [ ] tilt
- [ ] footer
- [ ] fix public env var
- [ ] open graph
- [ ] turborepo setup?

## Notes

According to Twitter's [Brand Toolkit](https://about.twitter.com/en/who-we-are/brand-toolkit), an embedded Tweet should use `Helvetica Neue`. However, [Figma Widgets](https://www.figma.com/widget-docs/api/component-Text#fontfamily) do not support using custom fonts and are limited to font families from [Google Fonts](https://fonts.google.com/about). Therefore, `Inter` has been picked as a middle-ground.