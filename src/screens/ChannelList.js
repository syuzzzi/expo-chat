import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const channels = [];
for (let i = 0; i < 1000; i++) {
  channels.push({
    id: i,
    title: `title: ${i}`,
    description: `desc: ${i}`,
    createdAt: i,
  });
}

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.itemBorder};
  padding: 15px 20px;
`;
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.itemTime};
`;
const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: "keyboard-arrow-right",
  size: 24,
  color: theme.ItemIcon,
}))``;
const Item = React.memo(
  // memo는 리렌더링 되는 걸 막을 수 있음
  ({ item: { id, title, description, createdAt }, onPress }) => {
    console.log(id);

    return (
      <ItemContainer onPress={onPress}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDesc>{description}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{createdAt}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  }
);

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
const StyledText = styled.Text`
  font-size: 30px;
`;

const ChannelList = ({ navigation }) => {
  return (
    <Container>
      <FlatList
        data={channels}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item["id"].toString()}
        windowSize={5} // 숫자를 줄이면 메모리를 아끼며 성능 개선이 가능. but 스크롤 빠르게 내릴 때 속도를 데이터가 못따라갈 수도 있음
      />
    </Container>
  );
};

export default ChannelList;
