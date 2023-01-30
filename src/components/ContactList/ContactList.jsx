import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContactList = ({ data, onDelete }) => {
    return (
        <ContainerList>
            <Title>Contacts</Title>
            {data.length > 0 ? (
                <Wrapper>
                    {data.map(({ id, name, number }, index) => (
                        <Item key={id} index={index}>
                            {name} : {number}
                            <ButtonClose onClick={() => onDelete(id)}></ButtonClose>
                        </Item>
                    ))}
                </Wrapper>
            ) : (
                <TextList>No contacts</TextList>
            )}
        </ContainerList>
    );
};

export default ContactList;

const ContainerList = styled.div`
    margin-top: 10px;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 20px;
`

const Wrapper = styled.ul`
    margin-top: 10px;
    list-style: none;
`

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 10px;
    padding: 10px;
    width: 280px;
    border-radius: 5px;
    color: #fff;
    background-color: #1876f1;
`

const ButtonClose = styled.button.attrs(() => ({ type: 'button', }))`
   display: flex;
   padding: 5px;
    border-radius: 50%;
    border: none;
    margin-left: 10px;
    align-items: center;
    cursor: pointer;
`;

const TextList = styled.span`
    display: inline-block;
    margin-top: 10px;
`;

ContactList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
    onDelete: PropTypes.func.isRequired,
};