import styled from "styled-components";

//original 
export const AnimationCard: React.FC<{
  name: string,
  rating: number,
}> = ({ name, rating }) => {
  return (
    <Wrapper>
      <div>
        {name}
      </div>
      {rating}
    </Wrapper>
  )
};

//선택적
// 하지만 type을 선호하는 경향이 있음
type Props = {
  name: string;
  rating: number;
};
 

export const AnimationCardSecond: React.FC<Props> = ({ name, rating }) => {
  return (
    <Wrapper>
      {name}
      {rating}
    </Wrapper>
  )
};


//--------------------------------------------
//third method
export const AnimationCardThird = ({ name, rating }: Props) => {
  return (
    <Wrapper>
      <h3>{name}</h3>
      <p>⭐ {rating}</p>
    </Wrapper>
  );
};



const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
