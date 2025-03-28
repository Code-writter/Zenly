import { InfiniteMovingCards } from "../ui/infinite-moving"

export default function InfiniteMovingCardComponent(){
    return(
        <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    )
}
const testimonials = [
    {
        name: "John Doe",
        quote: "This is a testimonial",
        image: "https://via.placeholder.com/150"
    }
]
