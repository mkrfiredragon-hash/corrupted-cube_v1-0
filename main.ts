namespace SpriteKind {
    export const yellow_fireball = SpriteKind.create()
    export const minimap = SpriteKind.create()
    export const enemy_orange = SpriteKind.create()
}
/**
 * /__________
 * 
 * \         |
 * 
 *           |
 * 
 *           |
 * 
 *           |
 * 
 *           |
 * 
 *           |
 * 
 *           |
 * 
 *           |
 */
/**
 * |
 * 
 * |
 * 
 * V
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.yellow_fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile72`, function (sprite, location) {
    if (core_intro == 0) {
        game.showLongText("'This feels like a bad idea'", DialogLayout.Center)
        game.showLongText("'I mean, why would I fall down there for no reason?'", DialogLayout.Center)
        mySprite.setPosition(mySprite.x, mySprite.y + -4)
        pause(100)
    } else if (core_intro == 1) {
        game.showLongText("'I guess this is the only way to remove the monsters . . .'", DialogLayout.Center)
        core_intro = 2
    } else {
        music.play(music.createSoundEffect(WaveShape.Noise, 1110, 0, 105, 0, 100, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    player_u = 1
    if (player_l == 1) {
        mySprite.setImage(img`
            . . . . . . . . . 1 1 1 . . . . 
            . . . . . 1 1 1 1 9 9 9 1 . . . 
            . . . . 1 b b b b c 6 6 9 1 . . 
            . . . 1 b b b b b c f 1 6 1 . . 
            . . 1 b b b b b c c f 1 6 1 . . 
            . . 1 b b b b c c f f 1 1 . . . 
            . . 1 b b b c c c f f 1 . . . . 
            . . . 1 c c c c f f f 1 . . . . 
            . . . . 1 1 d d b c 6 6 1 . . . 
            . . . . . 1 d b c c f 6 1 . . . 
            . . . . . 1 b b c c f 6 1 . . . 
            . . . . . 1 b c c c f 8 6 1 . . 
            . . . . . 1 b c c f f 8 8 1 . . 
            . . . . . 1 e c f f e 8 8 1 . . 
            . . . . . 1 e e 8 e e 8 1 . . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            `)
    } else if (player_r == 1) {
        mySprite.setImage(img`
            . . . . 1 1 1 . . . . . . . . . 
            . . . 1 9 9 9 1 1 1 1 . . . . . 
            . . 1 9 6 6 c b b b b 1 . . . . 
            . . 1 6 1 f c b b b b b 1 . . . 
            . . 1 6 1 f c c b b b b b 1 . . 
            . . . 1 1 f c c c b b b b 1 . . 
            . . . . 1 f f f c c b b b 1 . . 
            . . . . 1 f f f f c c c 1 . . . 
            . . . 1 6 6 c b d d 1 1 . . . . 
            . . . 1 6 f c c b d 1 . . . . . 
            . . . 1 6 f c c b b 1 . . . . . 
            . . 1 6 8 f c c c b 1 . . . . . 
            . . 1 8 8 f f c c b 1 . . . . . 
            . . 1 8 8 e f f c e 1 . . . . . 
            . . . 1 8 e e 8 e e 1 . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            `)
    } else {
        mySprite.setImage(img`
            . . . . 1 1 1 . . . . . . . . . 
            . . . 1 9 9 9 1 1 1 1 . . . . . 
            . . 1 9 6 6 c b b b b 1 . . . . 
            . . 1 6 1 f c b b b b b 1 . . . 
            . . 1 6 1 f c c b b b b b 1 . . 
            . . . 1 1 f c c c b b b b 1 . . 
            . . . . 1 f f f c c b b b 1 . . 
            . . . . 1 f f f f c c c 1 . . . 
            . . . 1 6 6 c b d d 1 1 . . . . 
            . . . 1 6 f c c b d 1 . . . . . 
            . . . 1 6 f c c b b 1 . . . . . 
            . . 1 6 8 f c c c b 1 . . . . . 
            . . 1 8 8 f f c c b 1 . . . . . 
            . . 1 8 8 e f f c e 1 . . . . . 
            . . . 1 8 e e 8 e e 1 . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            `)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.enemy_orange, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    pause(500)
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile45`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(57, 19))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 5
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile67`, function (sprite, location) {
    if (ch_2_o == 0) {
        game.showLongText("You Found: Rubber Soles! (+20% move speed)", DialogLayout.Center)
        controller.moveSprite(mySprite, 120, 120)
        ch_2_o = 1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile46`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(28, 57))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    pause(1000)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 2) {
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 4 . . . . . 
            . . . . 2 . . . . 4 4 . . . . . 
            . . . . 2 4 . . 4 5 4 . . . . . 
            . . . . . 2 4 d 5 5 4 . . . . . 
            . . . . . 2 5 5 5 5 4 . . . . . 
            . . . . . . 2 5 5 5 5 4 . . . . 
            . . . . . . 2 5 4 2 4 4 . . . . 
            . . . . . . 4 4 . . 2 4 4 . . . 
            . . . . . 4 4 . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        fireball.setPosition(mySprite.x, mySprite.y)
        fireball.setVelocity(fireball_speed * player_move_x, fireball_speed * player_move_y)
        fireball.setFlag(SpriteFlag.DestroyOnWall, true)
        statusbar.value += mana_cost
        pause(500)
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    player_d = 0
})
controller.combos.attachCombo("uuddlrlrba", function () {
    controller.moveSprite(mySprite, 400, 400)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    player_l = 1
    if (player_u == 0) {
        mySprite.setImage(img`
            . . . . . . . . . 1 1 1 . . . . 
            . . . . . 1 1 1 1 9 9 9 1 . . . 
            . . . . 1 b b b b c 6 6 9 1 . . 
            . . . 1 b 1 c 1 c 1 f 1 6 1 . . 
            . . 1 b c 1 c 1 c d f 1 6 1 . . 
            . . 1 b c 1 c d f d f 1 1 . . . 
            . . 1 b c d f d f d f 1 . . . . 
            . . . 1 b b b c f f f 1 . . . . 
            . . . . 1 1 d d b c 6 6 1 . . . 
            . . . . . 1 d b c c f 6 1 . . . 
            . . . . . 1 b b c c f 6 1 . . . 
            . . . . . 1 b c c c f 8 6 1 . . 
            . . . . . 1 b c c f f 8 8 1 . . 
            . . . . . 1 e c f f e 8 8 1 . . 
            . . . . . 1 e e 8 e e 8 1 . . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            `)
    } else {
        mySprite.setImage(img`
            . . . . . . . . . 1 1 1 . . . . 
            . . . . . 1 1 1 1 9 9 9 1 . . . 
            . . . . 1 b b b b c 6 6 9 1 . . 
            . . . 1 b b b b b c f 1 6 1 . . 
            . . 1 b b b b b c c f 1 6 1 . . 
            . . 1 b b b b c c f f 1 1 . . . 
            . . 1 b b b c c c f f 1 . . . . 
            . . . 1 c c c c f f f 1 . . . . 
            . . . . 1 1 d d b c 6 6 1 . . . 
            . . . . . 1 d b c c f 6 1 . . . 
            . . . . . 1 b b c c f 6 1 . . . 
            . . . . . 1 b c c c f 8 6 1 . . 
            . . . . . 1 b c c f f 8 8 1 . . 
            . . . . . 1 e c f f e 8 8 1 . . 
            . . . . . 1 e e 8 e e 8 1 . . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            `)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(11, 9))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile42`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 5))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 5
    pause(1000)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    player_r = 0
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    player_l = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile74`, function (sprite, location) {
    if (arena_front == 0) {
        game.showLongText("This is another Arena.", DialogLayout.Center)
        game.showLongText("Look out for the orange enemies here, there are a lot and they could corner you.", DialogLayout.Center)
        enemy_red_ = 10
        enemy_orange_ = 2
        enemy_yellow_ = 1
    }
    arena_front = 1
})
/**
 * __________\
 * 
 * |         /
 * 
 * |
 * 
 * |
 * 
 * |
 * 
 * |
 * 
 * |
 * 
 * |
 * 
 * |
 */
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile49`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level0`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(50, 2))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy_orange)
    random_spawns = 3
    pause(1000)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    player_r = 1
    if (player_u == 0) {
        mySprite.setImage(assets.image`myImage`)
    } else {
        mySprite.setImage(img`
            . . . . 1 1 1 . . . . . . . . . 
            . . . 1 9 9 9 1 1 1 1 . . . . . 
            . . 1 9 6 6 c b b b b 1 . . . . 
            . . 1 6 1 f c b b b b b 1 . . . 
            . . 1 6 1 f c c b b b b b 1 . . 
            . . . 1 1 f c c c b b b b 1 . . 
            . . . . 1 f f f c c b b b 1 . . 
            . . . . 1 f f f f c c c 1 . . . 
            . . . 1 6 6 c b d d 1 1 . . . . 
            . . . 1 6 f c c b d 1 . . . . . 
            . . . 1 6 f c c b b 1 . . . . . 
            . . 1 6 8 f c c c b 1 . . . . . 
            . . 1 8 8 f f c c b 1 . . . . . 
            . . 1 8 8 e f f c e 1 . . . . . 
            . . . 1 8 e e 8 e e 1 . . . . . 
            . . . . 1 1 1 1 1 1 . . . . . . 
            `)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level3`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 19))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 17
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile66`, function (sprite, location) {
    if (ch_1_o == 0) {
        game.showLongText("You Found: Enchanted Gloves! (+50% fireball speed)", DialogLayout.Center)
        fireball_speed += 50
        ch_1_o = 1
    }
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    player_u = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level5`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(28, 2))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile43`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 35))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 5
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile52`, function (sprite, location) {
    sprites.destroy(mySprite)
    myMinimap = minimap.minimap()
    tiles.setCurrentTilemap(tilemap`level8`)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffff1fffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11fffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bb1d1d11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bbb11dddddd11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11dddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbb11ddddddddddddddddddd11bb111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbb1dddddddddddddddddddddddddd1bbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffddaaadddddddddddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffddaaddddddddddddddddddddddddddddddddddddddddddddaaddfffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffdaaadddddddddddddddddddddddddddddddddddddddddddddddaadffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaaaaabddbddddddddddddddddddddddddddddddddddddbdddbaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbaaadddddddddbddddddddddddddddddddddddbddddddcaaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbaacbdddbdddddddddddddbddbdddddddbdddddbbcaafffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbcccbddddddbddddddddddddddbddddddbddbaaafffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1ffffffffffffffffffffffffdaabbbbbbbcccbbdbddddbddddddddddbddddddbbbbccafffffffcadfffffffffffffffffff1fffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbcccbbbbbdddddbddbdddddddbdbbbccafffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbcccbdbbbbbbbdbbbdbbbccccfffffffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbccbbbbbdbbbbbbbccccffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbcccbbbbbbbbbccccffffffffffffffcfffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbabbbbbbbbbbbccccbbbbbccccffffffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbbbbccccccccffffffffffffffcffffffffccdfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdaacbbbbbbbbbbbbbbbbbbbbbccccffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbbbbbbbbbabbbbbbbbbbccffffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdacbbbabbbbbabbbbbbbbabbbccffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdacbbbbbbbbbbbbbbbbbbbbbbccffffffffffffffffffffffffffcabffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbabbbbbbbbbbbbbbbbbbccfffffffffffffcfffffcffcfffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdcabbabbbbbbbbbbbbabbbbbbccffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdcababbbbabbbbbbbbbbbbbbbccffffffffffffffffcfffffffcfccdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffff1fffffffffffffffffffffffffffffffffffffffffdcabbbabbbbbbbbbbbbbbbabbccfffcfffcffffcffffcffffcfffcfdffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffff1ffffffffffffffffffffffffffffffdacbbabbbbababbbaabbbbabbccffffffffffccfffffffccfffffccbffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbababbbbbbabbbbbbbbbccffffffffffcccfcfffffcccfffcfbffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbababbaabbbbbbbaabbbbbccffcfffffcffcfffcfffffcffcccdfffffffffffffffffffffffffff1fffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdcccbababbbabbabbbaabbbabcccfffffcccfffffffffcffcfcffcfbffffffffffffffffffffffffffffffff1ffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccababbbabaabaabbaaaabbbccccffffccffcffcffffffffcfcccfdfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaabbaaaaaabbbababbabbbcccfaffffffffcffccfffccccfccfcbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff1fffffffffffffffffdccabbaaaabababbabbbababbccffccfffffffcfcffffccffcfccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaabbaaaaaaaaabaaabbabbccffffcfffffcccfffcfccffccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccabaabbbaaabbabaaaaaabbfcfffcfcfcfffffcfcccffffffccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaabaaafcfffcfcffffcffcffccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff1fffffffffffffffffdccaaaabaaaaaaaabaaabaaaafcfffccccffccfcccfccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaabbaababaabbbbaaaaffcfffccfcccfcccccccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaabbaaaaaaaaababafffcfcfffcccfcccfccccfccccccffbffffffffffff1ffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaaabaaffcffccccffcfcccccccccccccfffbffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaabaaaaaffccffffccfcccccccccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdcccaaaaaaaaaaaaaaaaaaaaffcfcccccccccccccccccccffbbffffffffffffffffffffffffff1ffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffddcccaaaaaaaaaaaaaaaaafffcccccccccccccccccccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaaafffcccccccccccccccccfffbfffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaffccccccccccccccccfffbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffddccaaaaaaaaaaaaffacaccccccccccccfbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddccaaaaaaaaaffccccacccaccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffbbccaaaaaaaffaacccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcccaaaaaffaccacacfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbcfcaaaffaacccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfcaaffaaafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcffffafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbffbbffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1fffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    pause(1000)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffff1ffffffffffffffffffffff1ffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11fffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bb1d1d11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bbb11dddddd11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11dddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbb11ddddddddddddddddddd11bb111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1dddddddddddddddddddddddddd1bbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffddddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbbffffffffffddddddddddddddddddddddddddddddaaddfffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddffffffffffdddddddddddddddddddddddddddddddaadffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffddaaadddddddddfffffffffffddddddddddddddddddddddbdddbaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffddaaddddddddddddddfffffffffffddddddddddddddddbddddddcaaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffdaaaddddddddddddddddffffffffffddbddbdddddddbdddddbbcaafffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaaaaabddbddddddddddddddddfffffddddddddbddddddbddbaaafffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffff1ffffffffffffffffffffffffdaabbaaadddddddddbddddddddfffffddddddbddddddbbbbccafffffffcadfffffffffffffffffff1fffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbaacbdddbdddddddddddfffffddbdddddddbdbbbccafffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbcccbddddddbddddddfffffbbdbbbdbbbccccfffffffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbcccbbdbddddbddddfffffbbbbbbbccccffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbcccbbbbbdddddbfffffbbbbbccccffffffffffffffcfffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbcccbdbbbbbfffffbbbccccffffffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbccbbbbbdfffffccccffffffffffffffcffffffffccdfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbcccbbbbfffffccffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbabbbbbbbbbbbccccbbfffffffffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbbbbccccfffffffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdaacbbbbbbbbbbbbbbbbbbbbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdccbbbbbbbbbbbabbbbbbbbbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdacbbbabbbbbabbbbbbbbabbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdacbbbbbbbbbbbbbbbbbbbbbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffff1ffffffffffffffffffffffffffffffffffffdccbbbabbbbbbbbbbbbbbbbbbccfffffffffffffffffffffffffffffffffffcabffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdcabbabbbbbbbbbbbbabbbbbbccffffffffffffffffffffffcfffffcffcfffccdffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdcababbbbabbbbbbbbbbbbbbbccfffffffffffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdcabbbabbbbbbbbbbbbbbbabbccfffffffffffffffffffffffffcfffffffcfccdffffffffffffffffffffff1fffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdacbbabbbbababbbaabbbbabbccfff99fffffffcfffcffffcffffcffffcfffcfdfffffffffffffffffffffffffff1ffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdccbbbababbbbbbabbbbbbbbbccff9119fffffffffffffccfffffffccfffffccbffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdccbababbaabbbbbbbaabbbbbccf915519ffffffffffffcccfcfffffcccfffcfbffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1fffffffffffffffffdcccbababbbabbabbbaabbbabcccf915419ffffcfffffcffcfffcfffffcffcccdfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccababbbabaabaabbaaaabbbcccff9119ffffffffcccfffffffffcffcfcffcfbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaabbaaaaaabbbababbabbbcccfff99ffffcffffccffcffcffffffffcfcccfdfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccabbaaaabababbabbbababbccfffffffffffaffffffffcffccfffccccfccfcbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1fffffffffffffffffdccaabbaaaaaaaaabaaabbabbccfffffffffffccfffffffcfcffffccffcfccffbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccabaabbbaaabbabaaaaaabbfcfffffffffffffcfffffcccfffcfccffccccffbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaabaaafcffffffffffffcfcfcfffffcfcccffffffccffbffffffff1ffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaabaaaaaaaabaaabaaaafcffffffffffffcfcffffcffcffccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaaabbaababaabbbbaaaaffffffffffffffccccffccfcccfccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaabbaaaaaaaaababafffffffffffcfffccfcccfcccccccccccccccffbffffffffffffffffff1ffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaaabaaffffffffffffcfcfffcccfcccfccccfccccccffbfffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaabaaaaafffffffffffcffccccffcfcccccccccccccfffbffffffffffffffffffffffffffffffffffffffffff1fffffff
        fffffffffffffffffffffffffffffffffffffffffffffffdcccaaaaaaaaaaaaaaaaaaaafffffffffffccffffccfcccccccccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffddcccaaaaaaaaaaaaaaaaaffffffffffffcfcccccccccccccccccccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaaaffffffffffffcccccccccccccccccccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffff1ffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaffffffffffffcccccccccccccccccfffbfffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffff1fffffffddccaaaaaaaaaaaafffffffffffccccccccccccccccfffbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddccaaaaaaaaafffffffffffacaccccccccccccfbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbccaaaaaaafffffffffffccccacccaccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcccaaaaafffffffffffaacccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbcfcaaafffffffffffaccacacfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfcaafffffffffffaacccfffbbffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcfffffffffffffaaafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffffffffffffafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfffffffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffff1fffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    pause(500)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffff1fffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffff1fffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffff1ffffffffff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
        ffffffffffffffffffffffffffffffffff11111ffffffff1ffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff111111fffffff1ffff1f1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff1111111ffffff1ffff1f1ffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff11111111fffff11fff1ff1ffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffff11111111fffff11fff1ff1ffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffff1ffffffffffffffffffff11111111ffff1f1ff1fff1fffffffff1fffffffffffffffffff11ffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffff11111111fff1f1ff1fff11fffffffff1fffffffffffffffff1fffffffffff1ff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffff11111111ff11f1f1fff111fffffffff1fffffffffffffff1fffffffffff1fff11ffffff1fffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffff111111111f11ff11ffff1f1fffffffff1ffffffffffff11fffffffffff1ffff1ffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffff1111111111f1f11ffff1f1fffffffff1fffffffffff1ffff11111fff1ffff11ffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffff1ffffffffffffffffff111111111f1ff1ffff11f1fffffffff11111ffff111ffff111111f1ffff1f1fffff1ffffffffff1ffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffff11fffffffffffffffff11111111ff1f1ffff11f1fffffffff111111ff1ff11fff1111111ffff1ff1ffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffff11ffffffffffffff1f11111111f1f1ffff11ff1ffffffff111111f1ff1f1fff1111111ffff1f1fffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffff1ffffffffffffff1111111111f11ffff11ff1ffffffff1111111fff1f1fff11111111ff1ff1ffff1ffffffffffffffffffffffffffffff1ffffffffffffffffffffffff
        fffffffffffffff1ffffffffff11ffffffffffff1f111111111f1ffff11ff11fffffff1111111fff1f1ffff1111111f1fff1fff1fffffffffffffffffffffffffffff11fffffffffffffffffffffffff
        fffffffffffffff1fffffff1ffff11ffffffffff1ff1111111111ffff11ff11ffffffff1111111f1ff1ffff11111111fff1fff1fffffffffffffffff111111ffffff1fffffffffffffffffffffffffff
        fffffffffffffff1ffffffff11ffff11ffffffff1fff1111111111fff11fff11fffffff1111111f1ff1fffff1111111fff1fff1ffffffffffff11111fffff1fffff1ffffffffffffffffffffffffffff
        fffffffffffffff1ffffffffff11ffff1ffffffff111111111111f1fff1fff11ffffff1f1111111fff1ffff1f1111111f1fff1fffffffff1111ffffffffff1fff11fffffffffffffffffffffffffffff
        fffffffffffffff1ff1fffffffff1ffff11fffffff111111111111f1ff1ffff11fff11ff1111111f11111ff1f11111111fff1ffff111111ffffffffffffff1ff1fffffffffffffff11ff1fffffffffff
        fffffffffffffff1fff11ffffffff11ffff11fffff11111111111111ff1ffff11ff1fffff111111111111f1fff1111111ff1ffff111111ffffffffffffff1ff1fffffffffffff111ffffffffffffffff
        fffffffffffffff1fffff11fff1ffff11ffff1ffff111111111111111f1ffff1111ffffff1111111111111fff111111111f1ff11111111fffffffffffff1f11ffffffffffff11fffffffffffffffffff
        fffffffffffffff1ffffff111f1ffffff1ffff11ff1111111111111111ffffff1ffff1111111111111111ffff1f11111111f1111111111ffffffffffff1f1fffffffffff111fffffffffffffffffffff
        fffffffffffffff1ffffffff111fffffff11ffff11f11111111111111111fff11f111fffff1111111111111f1fff111111111111111111ffffffffff11f1fffffffff111ffffffffffffffffffffffff
        ffffffff111111f1fffffffff1111fffffff111fff1111111111111111ff111f11f11111111111111111fff11fff11111111111111111ffffffffff1f11ffffffff11fffffffffffffffffffffffffff
        ffffffff111111111fffffffff11111fffffff1111ff111111111111111f1f1111111f11fff111111111111ff11f1111111111111111ff11111fff1f1fffffff111fffffffffffffffffffffffffffff
        ffffffff111111111111ffffff1ff1111ffffff11f11f111111111111111f11111111111111111111111f1111ff111111111111111ff1111111ff1f1fffff111fffffff11111111111ffffffffffffff
        ffffffff111111111111111fff1f1ff111111111f11f11111111111111111111ff1ffffff111111111ff1ff1f1111f11111111111ff11111111f111ff11111111111111fffffffffff111111ffffffff
        ffffffff1111111111111111111ffffff111111111f11f1111111111111111ffff1fffff111111111111f1ff11f1f11111111111f111111111111f1111fffffffffffffffffffffffff111111fffffff
        ffffffffff1111111111111111111ffffff11111111ff1f1ff1111111555551ffff1ffff11111111111fff1fff1f11111111111f1111111111111111ffffffffffffffffffffff11111fffffffffffff
        fffffffffffff1111111111111111111fff111111111ff11ff1111111555555fff111115551111111111fff1fff11111111111111111111111111ffffffffffffffffffff11111ffffffffffffffffff
        fffffffffffffff1111111111111111111111111111111f111f111111555555511f1ff15551111111111fff1ff111111111111111111111111fffffffffffffffffff1111fffffffffffffffffffffff
        fffffffffffffff1fff11111111111111111111111111111f111f111155555555fff115555111f1111111fff111111111155555111111111fffffffffffffffff1111fffffffffffffffffff11ffffff
        fffffffffffffff1ffffff1111111111111111111111111111111f111555555551ff115555111f1111111fff11111111555555511111111ffffff111ffffff111ffffffffffffffffffff111ffffffff
        fffffffffffff111ffffffff111111111111111111111111111f111111555555551115555111ff1111111111111111555555555111111fffffffffff111111ffffffffffffffffffff111fffffffffff
        fffffffffffffff1111fffff111111111111111111115551111ff111f115555555515555511ff1f11111111111115555555555511111fffffffff11111fff111111fff1ffffffff111ffffffffffffff
        fffffffffffffff1fff1111f1f1ff1111111111111115555511111ff111155555555555511ff1fff111111111155555555555551111ffffffff1111111fffffffff1111fffff111fffffffffffffffff
        ffffffffffff11111111111111111111111111111111155555511111ff115555555555511111ffff1111111155555555555555111111fff11111111111ffff11111ff1fff111ffffffffffffffffffff
        fffffffffffff111ffffffff1ff1111fff11f1111111155555555111ffff155555555555511111fff111115555555555555511111111111111111111111111111111111111ffffffffffffffffffffff
        ffffffffffffff111ffffff11ff1fff1111f111f1111111555555551111ff155555555555555511111111555555555555511f11111111fff1111111111fffffffff111ffff1111111111fffffff1111f
        ffffffffffffff1ff111fff11ff1fffffff111111ff11111155555555111111555555555555555555115555555555555111f1111111111f1111111111fffffff1111fff11111111111111111111fffff
        ffffffffff1fff1fffff1111fff1fffffffff111111ff1111115555555555551555544455555555555544455555555111f111f111111111111111111fffff111ff1f111fffff1111111fffffffffffff
        ffffffffffffff1ffffff1111ff1ffffffff1ffffff11111f1555555555555555555444445555555544444555555111ff1f1ff11111111111111111ffff11fff111111111111ffffffffffffffffffff
        ffffffffffffff1fffffff11f111ffffff11ffffffff1f111155555555555555555544444445555444444455551111ff1f11ff1f1111111111111fff111ff1111111ffffffffffffffffffffffffffff
        ffffffff111111111fffff11fff11ffff1ffffffffff1ff1115555555444455555555444444444444444455551111111ff11ff11f11111111111f111111111111fffff1fffffffffffffffffffffffff
        ffffffffffffff1ff1111111111111111fffffffffff1ff1f111555554444442225555522244444444455551111ff11111f1ff11f1111111111111111111111111111111111111ffffffffffffffffff
        fffffffffffff1fffffff11fffff1f111111111111111111111111555444444222255422224444444555555555555f1f11111111111111111111111111111111ffffffffffff11ffffffffffffffffff
        fffffffffffff1fffffff11fffff11fff11ffffffff1111111111111555444422222222229222244444555555555555555511111111111111111111111111111ffffffff1111ffffffffffffffffffff
        fffffffffffff1fffffff1111111111111f11fff1111111111111111115554442222222299922224114445555555555555555551111111111111111111111111fff11111ffffffffffffffffffffffff
        fffffffffffff1fff111111fff1f1fffff11111111111111111111111155555442222229999922241144451111155555555555511111111111111111111f1f11111fffffffffffffffffffffffffffff
        ffffffffffff1f111fff11fff1ff1fffff1155555555555555511111111544444422222299922224141445511111111115555551111111111111ffff111111ffffffffffff111111111111ffffffffff
        ffffffffffff11ffffff11f11fff1f111111555555555555555555554444444444444222292222414414555111111111111111111111f11111111111111111111111111111ffffffffffff1fffffffff
        fffffffffff11fffffff111ffff111111111555555555555555555554444444444444222222224414415555555555511111111111111111111111ff111111111fffff1111111111111111ff1ffffffff
        fffffffffff1ffffffff11ff11111111111155555555555555555555444444444444422244444414441444555555555555555511111fff111111111fff1ffffffffffff11ffffffffffff111111111ff
        fffffffffff1111111111111111111111111555555555555555555555444444444455544444444144441444444455555555511555ff1fff11111111111fffffffffffffff11ffffffffffff1ffffffff
        fffffffffff11fffff1f1f111111111111111111111111155555555544444444455544444444441444414444444444555111555551111ff11111111f1111fffffffffffffff11ffffffffff1ffffffff
        ffffffffff1ff1ff11f11f11111111111111111111111111111115444444444555114444445551444451444444444455551155555111111f11111111ffff111ffffffffffffff11ffffffff1ffffffff
        ffffffffff1fff11fff1ff111111111fff1111111111f1f1111555444444555551114444555111444441555514444455555511115111111111111111fffffff111fffffffffffff111ffff1fffffffff
        fffffffff1fffff1fff1ff111111f1ffffffff111ffff1f115555544445555511111111f1111115444415555111111111111111111111111111111111ffffffff111ffffffffffffff11f1ffffffffff
        fffffffff1ffffff1111fff1ffffff1fffff111fffffff11555555555555511111111ff1111111154441455515151111111f111111111111111111111fffffffffff11111111ffffffff111f1fffffff
        fffffffff1ffffffff1fff1fffffff1ff111fff1ffffff1155555555555111111111f111f1f11115544145551511551111ff1f11111111111111111111ffffffffffff1111ff11111f11fff11fffffff
        ffffffff1fffffffff1ff1ffffffff111ffffff1fffff111555555555111111111111f1f1ff1111155414555151155151111ff1ff1111111111111111111fffffffffff1ff11fffff1fffffff11fffff
        ffffffff1ffffffff1fff1ffffff111ffffffff1ffff11111555555111111111111ff111fff1f111155155551111151115f111fffff1f11111111111111111111111111111111111111111111111111f
        fffffff1fffffffff1f11ffff111ff1ffffffff1ff111111555551111111111ffff111fffff1f1f11151555155111115511ff11fffff1111ff11111111111111111111111111111111111111fff1111f
        fffffff1ffffffff1fff1ff11fffff1fffffffff111111111111111111111ffffff11fffff1ff1ff111155515151111555111ff11fffff11ff1f111111111f11ff1111ff1111111111111111111fffff
        fffffff1ffffffff1ff1fffffffff111fffffff111111111111111111111ffffff11ffffff1ff1ff111155515155111111111ffff11fff1f111f1f11111111ff11ffff11fffff11ffffff11fffffffff
        ffffff1fffffffff1ff1fffffff111f1ffffff1f111111111111111111fffffff11f1ffff11ff1f1f11155155151111111111111fff11ff1111ff1111111111fff11ffffffffff1ffffffff111ffffff
        ffffff1ffffffff1ff1fffffff1ff1f1ffff11ff111111111111111111fffffff1ff1ffff1fff11f11111515515111111111111f11fff1f11f111f11111111f1ffff111fffffff1fffffffffff11ffff
        ffffff1ffffffff1ff1ffffff1ff1ff1ff111ff1111111111111111f1111fffff1fff1ff11fff1111111115515511511111111f1ff11ff11111ff1f1111111ff1ffffff11fffff1fffffffffffffffff
        fffff1ffffffff1ff1ffffff1fff1ff111ff1f111111111111111f11f11f1fff1ffff1ff111ff1111111111515511511111111ff1fff111f111fff11111111ff1ffffffff111111fffffffffffffffff
        fffff1fffffff1fff1fffff1fff1ff11fff1f111111111111111ffff111111f11fffff1f1f1111111111111f15511511111111fff1ffff11111ffff1111111fff1ffffffffffffffffffffffffffffff
        fffff1fffffff1ff1fffff1fff1f11f1ff1ff111111111f1ffffffff11111111ffffff111f11111111111ff155151511111111ffff1ff1fff1111ff1f11111ffff1fffffffffffffffffffffffffffff
        fffff1ffffff1ff1fffff1fff1f1ffff1f111111111111f1ffffffff1f1ff11111111111111111111111111115151511111111fffff11ffff11f1111ff111fffff1fffffffffffffffffffffffffffff
        ffff1ffffff1fff1ffff1fff111ffff1111f11111111f1f1fffffff1f1f1111111111ff1f11111111111111fff151511111111ffffff1ff1ff11ff11fff1f11ffff1ffffffffffffffffffffffffffff
        ffff1ffffff1ff1ffff1fff11ffff11f1f11f111111ff1f1ffffff1ff1ff111fff111111111111111111f1ffff111111111111fffff1f1f1ff11fff111111f111fff1fffffff1fffffffffffffffffff
        ffff1fffff1fff1fff1ff11fffffffff1f111fff11fff1f1fffff1ff1ff1f111ffffff1111111111fffff1fff11f1111111111ffff1fff1f11111ff1ff111111f1ff1fffffffffffffffffffffffffff
        fff1fffff1fff1fff1f111ffffffffff1f1fffff1ffff1f11fff1fff1ff1f1ff111ff11111111111ffff1ff11f1f1f11111111ffff1ffff1f1111ff1fff111111f11f1fffffffffffffffff1ffffffff
        fff1fffff1fff1ff1f11ffffffffffff11ffffff1ffff1f1ffff1ff1ff1f1fffff11111111111111ffff111ff1ff1f11111111fff1ffffff1f1111f1fff1fff111ff11ffffffffffffffffffffffffff
        fff1ffff1ffff1f111fffffffffffff1f1ffffff1ffff1f1ffff1f1ff1ff1ffffff11111111111111111fffff1ff1f11111111ff1ffffffff1ff11f1fff1fff11f11ff11ffffffffffffffffffffffff
        fff1fff1fffff11ffffffffffffff11ff1ffffff1ffff1ff1fff1f1ff1f1fffffff11111111fff1f1ff1ffff1fff1f1f111111f1ffffffffff1f1f11fff1fff11ff1111f1fffffffffffffffffffffff
        fff1ff1fffffffffffffffffffff1ffff1ffffff1fff1fffffff11ff1ff1fffffff1111111f1ff1f1f1fffff1fff1f1ff11111f1fffffffffff11111fff1ffff11ff1f11111fffffffffffffffffffff
        fff1f1ffffffffffffffffffff11fffff1ffffff1fff1fffffff1ff1ff1fffffff1f11111ff1ff1ff11fffff1fff1f1ffff1f11fffffffffffff11f111f1ffff1f1ff11ff1111fffffffffffffffffff
        ffff1ffffffffffffffffffff1fffffff1ffffff1fff1ffffff11fffff1fffffff1f111fffff1f1ff1fffff1ffff1f1ffff1f11ffffffffffffff1ff1111fffff1ffff1fffff11ffffffffffffffffff
        fffffffffffffffffffffff11ffffffff1ffffff1fff1ffffff1f1fff1fffffff1fff1ffffff1f1ff1fffff1ffff1f1ffff1f11fffffffffffffff1f1ff1fffff1ffff1fffffff11ffffffffffffffff
        ffffffffffffffffffffff1fffffffffff1fffff1fff1fffff1ff1fff1ffffff1ffff1fffffff11ffffffff11fff1f1fffff1f1ffffffffffffffff11fff1fffff1fffffffffffff111fffffffffffff
        ffffffffffffffffffff11ffffffffffff1fffff1fff1ffff1ffff1ff1fffff1fffffffffffff1f1ffffff1fffff1f1ffff11f1ffffffffffffffff11ffff1fffff1fffffffffffffff11fffffffffff
        fffffffffffffffffff1fffffffffffffff1ffff1fff1ffff1ffff1f1fffff1fffffffffffffff11ffffff1fffff1f1ffff11f1fffffffffffffffff11ffff1ffff1fffffffffffffffff11fffffffff
        fffff1fffffffffff11ffffffffffffffff1ffff1fff1fff1fffff1f1ffff1fffffffffffffffff1ffffff1fffff1f1fff1f1ff1fffffffffffffffff1fffff1fff1ffffffffffffffffffffffffffff
        ffffffffffffffff1ffffffffffffffffff1ffff1fff1ff1ffffff11ffff1ffffffffffffffffff1fffff1ffffff11fff1fff1f1fffffffffffffffff1ffffff1fff1fffffffffffffffffffffffffff
        fffffffffffffff1ffffffffffffffffffff1fff1fff1ff1ffffffffffff1ffffffffffffffffff1fffff1ffffff11ff1ffff1f1fffffffffffffffff11ffffff1ff1fffffffffffffffffffffffffff
        fffffffffffff11fffffffffffffffffffff1fff1fff1f1ffffffffffff1ffffffffffffffffffff1ffff1ffffff1fff1ffff1ff1fffffffffffffffff11ffffff1ff1ffffffffffffffffffffffffff
        ffffffffffff1ffffffffffffffffffffffff1f1ffff11ffffffffffff1fffffffffffffffffffff1fff1fffffff1ff1ffffff1f1fffffffffffffffff11fffffff1f1ffffffffffffffffffffffffff
        ffffffffff11fffffffffffffffffffffffff1f1fffffffffffffffff1ffffffffffffffffffffff1fff1fffffff1f1fffffff1ff1ffffffffffffffff11fffffff1f1fffffff1ffffffffffffffffff
        fffffffff1ffffffffffffffffffffffffffff11ffffffffffffffff1fffffffffffffffffffffff1ff1ffffffffff1fffffff1ff1fffffffffffffffff1ffffffff1f1fffffffffffffffffffffffff
        fffffff11fffffffffffffffffff1ffffffffff1ffff1ffffffffff1ffffffffffffffffffffffff1f1ffffffffff1fffffffff1f1fffffffffffffffff1fffffffff11fffffffffffffffffffffffff
        ffffff1fffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffff11ff1ffffff1ffffffffff1f1ffffffffffffffffffffffffffff11ffffffffffffffffffffffff
        ffff11fffffffffffff1ffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffff1fffffffffff11fffffffffffffffffffffffffffff1ffffffffffffffffffffffff
        fff1fffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffff1fffffffffffff1fffffffffffffffffffffffffffff11fffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffff1ffffffffffffff1ffffffffffffffffffffffffffffff1fffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
    pause(100)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffff1ffffffffffffffffffffff1ffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11ffffffffffffffffffffffffbbffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11bb11fffffffffffffffffffffdffbbf11fffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bb1d1d11bb11fffffffffffffffffffdddffdfb11fffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bbb11dddddd11bb11ffffffffffffffffddddddffdbb11fffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11dddddddddddd1bbffffffffffffffffdddddddddddaaddfffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddd1ffffffffffffffffdddddddddddddaadffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbb11dddddddddddddddddddffffffffffffffffdddddddbdddbaaaaffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1dddddddddddddddddddddddffffffffffffffffdddbddddddcaafffdfffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddddddddddddddddddddddddffffffffffffffffffddddbbcaafffffffffffffffffffffffffffff1fffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111ffffffdddddddddddddddddddddddfffffffffffffffffffddbaaafffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbbffffffffffdddddddddddddddddddfffffffffffffffffffbccafffffffffdfffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddffffffffffddddddddddddddddddfffffffffffffffffffcafffffffffffdfffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffddaaadddddddddfffffffffffdddddddddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffaddddddddddddddfffffffffffdddddddddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddddddddffffffffffddbddbdddddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffddbddddddddddddddfffffffddddddddbddddffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffff1fffffffffffffffffffffffffffffffffddddddddbdddddddffffffddddddbdddddffffffffffffffffffffffcffffffffffffff1fffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffbdddbddddddddddfffffffdbdddddddbdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffccbddddddbddddddffffffbdbbbdbbbccffffffffffffffffffffffffffffffaffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcbbdbddddbddddffffffbffbbbccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccbbbbbdddddbffffffffbbccfcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbbcccbdbbbbbffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbfbfffffffffffffffffffffffffbbbbbccbbbbbdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbffbffffffffffffffffffffffffbbbbbcccbbbbfffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbbbfbfffffffffffffffffffffffbbbbbbccccbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbbbbbfffffffffffffffffffffffbbbbbbbbccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbbbfffffffffffffffffffffffffbbbbbbbbbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbbafbbfffffffffffffffffffffffffbbbbbbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffdaabbbbbbbbbfffffffffffffffffffffbfffbbbabbbccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffdaacbbbbbbfbffffffffffffffffffffffffffbbbbbbbcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffff1ffffffffffffffffdccbbbbbbbfbbfffffffffffffffffffffffffbfbbbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffdacbbbabbbbbffffffffffffffffffffffffffffffbbfffff9999ffffffffffffffffcfffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffdacbbbbbbbbbbfffffffffffffffffffffffffbffbbbfcf99999999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffdccbbbabbfbfbfffffffffffffffffffffffffbfffffbf9991111999ffffffffffffffffcffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffff
        fffffffffffffffffffffffffdcabbabbbbbbffffffffffffffffffffffffffffffffff9911111199fffffffffffffffffcffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffff
        fffffffffffffffffffffffffdcababbbfabffffffffffffffffffffffffffffffffff991115511199fffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffdcabbbffbbfffffffffffffffffffffffffffffffffff991154451199fffffffffffffffffffcccffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffff991152451199ffffffffffffffffffffcffcccffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff991115511199fffffffffffffffffffcfcffcfbfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9911111199fffffffffffffffffffffcfcccfdfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9991111999ffffffffffffffffffcfccfccfcbfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff99999999ffffffffffffffffffccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9999ffffffffffffffffffffccffccccffbfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffffbffffffff1ffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffdacbfaffbffffbfbafffffffffcffffffffffffffffffffffffffffffffffccffffccffbfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffdccfffabfbbfbbffbfbfbffffcfffffffffffffffffffffffffffffffffffffccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffdccbababfffffbffffaaffbbffffffffffffffffffffffffffffffffffffccfccccccffbffffffffffffffffff1ffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdcccbababbfafbafbfafbfbffcffffffffffffffffffffffffffffffffffffcfccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccababbbafaafafbbaaaabffccffffffffffffffffffffffffffffffffffcffccccfffbffffffffffffffffffffffffffffffffffffffffff1fffffffff
        ffffffffffffffffffffffffffffffffffffdccaabbaaaaaabbbafabfffbbcfffffffffffffffffffffffffffffffffffcccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccabbaaaabababbabfbfbafffcffffffffffffffffffffffffffffffffffccccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaabbaaaaaaaaabafffffbfccffffffffffffffffffffffffffffffffffccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffff1ffffffffffffffffffdccabaabbbaaabbabaaafaabffffffffffffffffffffffffffffffffffffffffbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaffffffcfffffffffffffffffffffffffffffffffffbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaabaaaaaaaabaaffaaaffcffffffffffffffffffffffffffffffffffbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaaabbaababaabffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaaaaabbaaaaaaaafbfbafffffffffffffffffffffffcfffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaafaafaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaabaaffaffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffdcccaaaaaaaaaaaaaaaaaafaffffffffffffffffffffffcfffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffddcccaaaaaaaaaaaaaaaaffffffffffffffffffffffffffffccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaaafffffffffffffffffffffcffffccfffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaffffffffffffffffffffffafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffff1fffffffddccaaaaaaaaaaaaffffffffffffffffffffffccfffffffffcffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffdddccaaaaaaaaaffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffbbccaaaaaaafffffffffffffffffffffffcfcfcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffbcccaaaaafffffffffffffffffffffffffcffffcfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffff1fffffffffffffffffffffffffbbcfcaaaffffffffffffffffffffffffcfcffccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfcaaffffffffffffffffffffcfffcfffccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcfffffffffffffffffffffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffff1fffffffffffffffffffffffffffffffffffffbffffffffffffffffffffffcfffcffffcffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbffffffffffffffffffffccfffffffcccfcccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbffffffffffffffffffcfcffcffccccfcccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccffcffccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccfccfcccccccccff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccfccfccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffacaccccccccccccfbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccacccaccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffaacccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaccacacfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaacccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaafffbbffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffff1fffffffffffffff1ffffffffffffffffffffffffffffffffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        `)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    player_d = 1
    if (player_l == 1) {
        mySprite.setImage(img`
            . . . . . . . . . 1 1 1 . . . . 
            . . . . . 1 1 1 1 9 9 9 1 . . . 
            . . . . 1 b b b b c 6 6 9 1 . . 
            . . . 1 b 1 c 1 c 1 f 1 6 1 . . 
            . . 1 b c 1 c 1 c d f 1 6 1 . . 
            . . 1 b c 1 c d f d f 1 1 . . . 
            . . 1 b c d f d f d f 1 . . . . 
            . . . 1 b b b c f f f 1 . . . . 
            . . . . 1 1 d d b c 6 6 1 . . . 
            . . . . . 1 d b c c f 6 1 . . . 
            . . . . . 1 b b c c f 6 1 . . . 
            . . . . . 1 b c c c f 8 6 1 . . 
            . . . . . 1 b c c f f 8 8 1 . . 
            . . . . . 1 e c f f e 8 8 1 . . 
            . . . . . 1 e e 8 e e 8 1 . . . 
            . . . . . . 1 1 1 1 1 1 . . . . 
            `)
    } else if (player_r == 1) {
        mySprite.setImage(assets.image`myImage`)
    } else {
        mySprite.setImage(assets.image`myImage`)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.enemy_orange, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile62`, function (sprite, location) {
    if (core_intro == 0) {
        game.showLongText("This is the planet's core.", DialogLayout.Center)
        game.showLongText("This keeps the Cube together and, if destabilized, it could cause the planet to shatter.", DialogLayout.Center)
        core_intro = 1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile68`, function (sprite, location) {
    if (ch_3_o == 0) {
        game.showLongText("You Found: Enchanted Necklace! (-1 fireball mana cost)", DialogLayout.Center)
        mana_cost += 1
        ch_3_o = 1
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level0`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(57, 5))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy_orange)
    random_spawns = 3
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile56`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level4`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(57, 56))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy_orange)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile48`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level4`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 49))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy_orange)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile55`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level3`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 2))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(130, 30)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.MinimapScale)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 5
    pause(1000)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    pause(500)
    sprites.destroy(sprite)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile35`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level7`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(30, 35))
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
    minimap1.setPosition(80, -50)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    random_spawns = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.enemy_orange)
    pause(1000)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile70`, function (sprite, location) {
    if (arena_ == 0) {
        game.showLongText("This is an Arena.", DialogLayout.Center)
        game.showLongText("Because I suck at this there's just a chest on the other side, go get it if ya want", DialogLayout.Center)
        enemy_red_ = 10
        enemy_orange_ = 2
        enemy_yellow_ = 1
    }
    arena_ = 1
})
let yellow_fireball: Sprite = null
let enemy_yellow: Sprite = null
let enemy_orange: Sprite = null
let enemy_red: Sprite = null
let arena_ = 0
let ch_3_o = 0
let ch_1_o = 0
let enemy_yellow_ = 0
let enemy_orange_ = 0
let enemy_red_ = 0
let arena_front = 0
let player_d = 0
let player_move_y = 0
let player_move_x = 0
let fireball: Sprite = null
let ch_2_o = 0
let player_r = 0
let player_l = 0
let player_u = 0
let core_intro = 0
let statusbar: StatusBarSprite = null
let mana_cost = 0
let minimap1: Sprite = null
let myMinimap: minimap.Minimap = null
let random_spawns = 0
let fireball_speed = 0
let mySprite: Sprite = null
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff1fffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11fffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bb1d1d11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bbb11dddddd11bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff11bb11dddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddd1bb11ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbb11ddddddddddddddddddd11bb111fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbb1dddddddddddddddddddddddddd1bbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff111bbdddddddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffff1fffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffddaaadddddddddddddddddddddddddddddddddddddddbb11fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffddaaddddddddddddddddddddddddddddddddddddddddddddaaddfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffdaaadddddddddddddddddddddddddddddddddddddddddddddddaadffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaaaaabddbddddddddddddddddddddddddddddddddddddbdddbaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbaaadddddddddbddddddddddddddddddddddddbddddddcaaaaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbaacbdddbdddddddddddddbddbdddddddbdddddbbcaafffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbcccbddddddbddddddddddddddbddddddbddbaaafffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff1ffffffffffffffffffffffffdaabbbbbbbcccbbdbddddbddddddddddbddddddbbbbccafffffffcadfffffffffffffffffff1fffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbcccbbbbbdddddbddbdddddddbdbbbccafffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbcccbdbbbbbbbdbbbdbbbccccfffffffffffffaadfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbccbbbbbdbbbbbbbccccffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbcccbbbbbbbbbccccffffffffffffffcfffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbabbbbbbbbbbbccccbbbbbccccffffffffffffffffffffacdfffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdaabbbbbbbbbbbbbbbbbbbccccccccffffffffffffffcffffffffccdfffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdaacbbbbbbbbbbbbbbbbbbbbbccccffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbbbbbbbbbabbbbbbbbbbccffffffffffffffffffffffffffacdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdacbbbabbbbbabbbbbbbbabbbccffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdacbbbbbbbbbbbbbbbbbbbbbbccffffffffffffffffffffffffffcabffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbabbbbbbbbbbbbbbbbbbccfffffffffffffcfffffcffcfffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdcabbabbbbbbbbbbbbabbbbbbccffffffffffffffffffffffffffccdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdcababbbbabbbbbbbbbbbbbbbccffffffffffffffffcfffffffcfccdffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff1fffffffffffffffffffffffffffffffffffffffffdcabbbabbbbbbbbbbbbbbbabbccfffcfffcffffcffffcffffcfffcfdffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff1ffffffffffffffffffffffffffffffdacbbabbbbababbbaabbbbabbccffffffffffccfffffffccfffffccbffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbbbababbbbbbabbbbbbbbbccffffffffffcccfcfffffcccfffcfbffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdccbababbaabbbbbbbaabbbbbccffcfffffcffcfffcfffffcffcccdfffffffffffffffffffffffffff1fffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdcccbababbbabbabbbaabbbabcccfffffcccfffffffffcffcfcffcfbffffffffffffffffffffffffffffffff1ffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccababbbabaabaabbaaaabbbccccffffccffcffcffffffffcfcccfdfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaabbaaaaaabbbababbabbbcccfaffffffffcffccfffccccfccfcbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff1fffffffffffffffffdccabbaaaabababbabbbababbccffccfffffffcfcffffccffcfccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaabbaaaaaaaaabaaabbabbccffffcfffffcccfffcfccffccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccabaabbbaaabbabaaaaaabbfcfffcfcfcfffffcfcccffffffccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaabaaafcfffcfcffffcffcffccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff1fffffffffffffffffdccaaaabaaaaaaaabaaabaaaafcfffccccffccfcccfccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaabbaababaabbbbaaaaffcfffccfcccfcccccccccccccccffbfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaabbaaaaaaaaababafffcfcfffcccfcccfccccfccccccffbffffffffffff1ffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaaaaabaaffcffccccffcfcccccccccccccfffbffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdccaaaaaaaaaaaaaaaabaaaaaffccffffccfcccccccccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffdcccaaaaaaaaaaaaaaaaaaaaffcfcccccccccccccccccccffbbffffffffffffffffffffffffff1ffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffddcccaaaaaaaaaaaaaaaaafffcccccccccccccccccccffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaaafffcccccccccccccccccfffbfffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffddccaaaaaaaaaaaaaaffccccccccccccccccfffbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffddccaaaaaaaaaaaaffacaccccccccccccfbbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddccaaaaaaaaaffccccacccaccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffbbccaaaaaaaffaacccccccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcccaaaaaffaccacacfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbcfcaaaffaacccfffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfcaaffaaafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbcffffafffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbffbbffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbbfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff1fffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1fffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
music.play(music.createSong(hex`0078000408040207001c00020a006400f401640000040000000000000000000000000000000003550000001000010c10001800010818002000010f20002800010c2800300002080d30003800011138004000010d40004800010a48005000010c50006000010f60006800011468007000011170007800010c78008000010809010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80090000000010001020800090001021000110001021800190001021c001d0001022400250001062800290001122c002d00010630003100011234003500010a38003900010a3c003d00010a40004100010244004500010248004900010850005100010254005500010260006100010868006900010a6c006d00010270007100010274007500010a7800790001027c007d000102`), music.PlaybackMode.LoopingInBackground)
game.showLongText("Welcome to Corrupted Cube!", DialogLayout.Bottom)
game.showLongText("You've been tasked with taking out a local monster infestation by force.", DialogLayout.Center)
game.showLongText("You're not sure how, but you know it must be done . . .", DialogLayout.Center)
game.showLongText("How To Play:", DialogLayout.Center)
game.showLongText("Use WASD to move and A to shoot", DialogLayout.Center)
game.showLongText("When you shoot a fireball you use Mana. You start with 10 and each fireball costs 2", DialogLayout.Center)
music.stopAllSounds()
music.play(music.createSong(hex`0078000408040208001c000e050046006603320000040a002d0000006400140001320002010002360000002000010820003000010a30003800010638004000010c40006000010860006800010d68007000010870007800010c78008000010609010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8005400000001000102040005000102100011000102140015000102200021000105280029000105300031000102380039000102400041000105480049000105500051000102580059000102600061000105700071000105`), music.PlaybackMode.LoopingInBackground)
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(mySprite, tiles.getTileLocation(56, 56))
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite, 100, 100)
fireball_speed = 110
let mana = 10
let mana_gain = 0.5
info.setLife(10)
random_spawns = 5
controller.combos.setTimeout(1000)
myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
minimap1 = sprites.create(minimap.getImage(myMinimap), SpriteKind.minimap)
minimap1.setPosition(130, 30)
minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.Double)
minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
mana_cost = -2
statusbar = statusbars.create(20, 4, StatusBarKind.Magic)
statusbar.max = mana
statusbar.setColor(9, 1)
statusbar.attachToSprite(mySprite, -20, 0)
forever(function () {
    if (random_spawns > 0) {
        enemy_red = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 1 1 1 2 f . . . . . 
            . . . . . f 2 1 1 1 f . . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . . . f . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        enemy_red.follow(mySprite, 60)
        tiles.placeOnRandomTile(enemy_red, assets.tile`myTile`)
        random_spawns += -1
    }
})
forever(function () {
    if (arena_ == 1 && enemy_red_ > 0) {
        enemy_red = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 1 1 1 2 f . . . . . 
            . . . . . f 2 1 1 1 f . . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f 1 1 f . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . . . f . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemy_red, assets.tile`myTile63`)
        enemy_red.follow(mySprite, 60)
        pause(2000)
        enemy_red_ += -1
    }
})
forever(function () {
    if (arena_ == 1 && enemy_orange_ > 0) {
        enemy_orange = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . . . . . f 1 4 4 1 f . . . . . 
            . . . . . f 4 4 4 4 f . . . . . 
            . f f f f f f f f f f f f f f . 
            . f 4 4 4 4 4 4 4 4 4 4 4 4 f . 
            . f 4 4 f 4 4 4 4 4 4 f 4 4 f . 
            . f 4 4 f 4 4 4 4 4 4 f 4 4 f . 
            . f 4 4 f 4 4 4 4 4 4 f 4 4 f . 
            . f f f f 4 4 4 4 4 4 f f f f . 
            . . . . f 4 4 4 4 4 4 f . . . . 
            . . . . f 4 4 4 4 4 4 f . . . . 
            . . . . f 4 4 f f 4 4 f . . . . 
            . . . . f 4 4 f f 4 4 f . . . . 
            . . . . f f f f f f f f . . . . 
            `, SpriteKind.enemy_orange)
        tiles.placeOnRandomTile(enemy_orange, assets.tile`myTile64`)
        enemy_orange.follow(mySprite, 30)
        pause(5000)
        enemy_orange_ += -1
    }
})
forever(function () {
    if (statusbar.value < 10) {
        statusbar.value += mana_gain
        pause(500)
    }
})
forever(function () {
    if (arena_ == 1 && enemy_yellow_ > 0) {
        enemy_yellow = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f 2 2 2 2 f . . . . . 
            . . . . f 2 2 2 2 2 2 f . . . . 
            . . . f 2 2 f f f f 2 2 f . . . 
            . . . f 2 f f c c f f 2 f . . . 
            . . . f 2 f c c c c f 2 f . . . 
            . . . . f f c c c c f f . . . . 
            . . . . . f c c c c f . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . f e f e e f . . . . . 
            . . . . . f e f e e f . . . . . 
            . . . . f e e f e e e f . . . . 
            . . . . f e e e f e e f . . . . 
            . . . . f e e e f e e f . . . . 
            . . . f e e e e e f e e f . . . 
            . . . f e e e e e f e e f . . . 
            . . . f e e e e e e f e f . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(enemy_yellow, assets.tile`myTile65`)
        pause(7000)
        enemy_yellow_ += -1
    }
})
forever(function () {
    if (enemy_yellow) {
        if (mySprite.x == enemy_yellow.x && mySprite.y == enemy_yellow.x) {
            info.changeLifeBy(-1)
        }
    }
})
forever(function () {
    if (enemy_yellow && enemy_yellow_ > 0) {
        yellow_fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . e . . . . . . . 
            . . . . . . . e 4 e . . . . . . 
            . . . . . . e e 4 4 e . . . . . 
            . . . . . e 4 4 5 4 e . . . . . 
            . . . . e 4 5 5 5 5 4 e . . . . 
            . . . . e 4 5 1 1 5 5 4 e . . . 
            . . . e 4 5 5 1 1 5 5 5 4 e . . 
            . . . . e 4 5 5 5 5 5 4 e . . . 
            . . . . . e 4 5 5 4 4 e . . . . 
            . . . . . . e 4 4 e 4 e . . . . 
            . . . . . . . e e . e e . . . . 
            . . . . . . . . . . . . e . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.yellow_fireball)
        yellow_fireball.setPosition(enemy_yellow.x, enemy_yellow.y)
        yellow_fireball.follow(mySprite, 130)
        pause(3000)
    }
})
forever(function () {
    if (player_u == 1) {
        player_move_y = -1
    }
    if (player_d == 1) {
        player_move_y = 1
    }
    if (player_l == 1) {
        player_move_x = -1
    }
    if (player_r == 1) {
        player_move_x = 1
    }
    if (player_u == 0 && player_d == 0 && !(player_u == 0 && player_d == 0 && (player_l == 0 && player_r == 0))) {
        player_move_y = 0
    }
    if (player_l == 0 && player_r == 0 && !(player_u == 0 && player_d == 0 && (player_l == 0 && player_r == 0))) {
        player_move_x = 0
    }
})
game.onUpdateInterval(100, function () {
    myMinimap = minimap.minimap(MinimapScale.Sixteenth, 2, 0)
    minimap1.setPosition(130, 30)
    minimap1.setFlag(SpriteFlag.RelativeToCamera, true)
    minimap.includeSprite(myMinimap, mySprite, MinimapSpriteScale.Octuple)
})
