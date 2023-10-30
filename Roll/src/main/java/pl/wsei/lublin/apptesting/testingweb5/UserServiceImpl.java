package pl.wsei.lublin.apptesting.testingweb5;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private PersonRepository personDao;

    @Autowired
    private TransformService transformer;

    @Override
    public void deleteById(Integer personId) {
        personDao.deleteById(personId);
    }

    @Override
    public User findById(Integer personId) {
        Optional<Person> found = personDao.findById(personId);

        if (found == null) {
            throw new UserNotFoundException("not found user", personId);
        }
        return transformer.toUserDomain(found.get());
    }

    @Override
    public User save(User user) {
        Person saved = personDao.save(transformer.toUserEntity(user));
        return transformer.toUserDomain(saved);
    }

    @Override
    public List<User> searchByCompanyName(String companyName) {
        List<Person> persons = personDao.findByCompany(companyName);
        List<User> users = new ArrayList<>();
        for (Person person : persons) {
            users.add(transformer.toUserDomain(person));
        }
        return users;
    }
}
