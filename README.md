F-Painter
=====

This is a program I made to visualize 3-place functions in a unique way. It takes three color components as values, each of which is a function with respect to x (the x position of a square on the grid), y, and t (the time). So, for example, if you set the red component's value to be ((x + y) + t), the red value for a square will be its x position, plus its y position, plus the time since starting the animation. That'll look like a the graph getts redder along a diagonal, and slowly "reds up" as time passes.

You can combine different functions between the color components for interesting effects. Try out some of these:

((x - y) < 25)

(255 * (x = (y + (t mod 100))))

(((x ^ 2) + (y ^ 2))+ (t ^ 2))

((((x ^ 2) + (y ^ 2))+ (t ^ 2)) * ((((x - ((fl (20 * (cos ((t mod 180) * (pi / 90))))) + 50)) ^ 2) + ((y - ((fl (20 * (sin ((t mod 180) * (pi / 90))))) + 25)) ^ 2)) < 100))
