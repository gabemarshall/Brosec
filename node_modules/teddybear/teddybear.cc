
#include "v8.h"
#include "node.h"
#include <stdint.h> // uint32_t
#include <time.h> // time_t, timespec, nanosleep

// standart node native module pattern
using namespace v8;
using namespace node;

// The function must have the type Handle<Value>
// when using NODE_SET_METHOD below
Handle<Value> Teddybear(const Arguments& args) {
  HandleScope scope;

  // Will take the first argument and convert it to a
  // unsigned 32bit integer
  uint32_t inputms = args[0]->Uint32Value();

  // After some testing nanosleep seams more
  // reliable than sleep and usleep.

  // Nanosleep takes seconds and nanoseconds as seperate
  // properties. We will therefor conver the inputms
  // to sec + ms
  time_t sec = (int)(inputms / 1000);
  long ms = inputms - (sec * 1000);

  // Nanosleep takes an required first argument,
  // there is an struct object containg two properties
  // (time_t) timer.tv_sec
  // (long) timer.tv_nsec.
  struct timespec timer;

  // Sets the second and nanosecond properties
  timer.tv_sec = sec;
  // I doubt that the L in this case is nessarry
  // but it means that this is a long number.
  timer.tv_nsec = ms * 1000000L;

  // Parse in a pointer to the timer object and set the
  // second argument to NULL. The second argument is a
  // timespec struct, and will contain the remaing time
  // if nanosleep failed. But since we aren't interrested
  // in that information we will just use NULL.
  if (nanosleep(&timer, NULL) < 0) {

    // If nanosleep returned something else than 0
    // an error ocured, and we will then throw.
    Local<String> msg = String::New("teddybear failed");
    return ThrowException(Exception::Error(msg));
  }

  // Yay, there where no problems
  return scope.Close(Boolean::New(true));
}

// Standart node native module pattern
void Initialize(Handle<Object> target) {
  HandleScope scope;

  // will export a func method on the
  // require(native module path) object.
  NODE_SET_METHOD(target, "func", Teddybear);
}

// Be sure to remember that `teddybear` should match the
// gyp target_name, if I'm not mistaken.
NODE_MODULE(teddybear, Initialize)
