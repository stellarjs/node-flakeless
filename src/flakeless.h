#ifndef _FLAKELESS_H
#define _FLAKELESS_H

#include <nan.h>

enum class FlakelessOutput {
  Base10,
  Base16,
  Base64
};

class Flakeless : public Nan::ObjectWrap {

  uint64_t counter_;
  uint64_t epochStart_;
  uint64_t lastTime_;
  uint64_t workerID_;

  // Some masks used for bit twiddling at the penultimate step.
  uint64_t timestampMask_;
  uint64_t workerMask_;
  uint64_t counterMask_;
  
  // How much to s\hift each of the fields by.
  int timestampShift_;
  int workerShift_;
  int counterShift_;

  FlakelessOutput outputType_;

public:

  static void Init(v8::Local<v8::Object> exports);

private:

  explicit Flakeless(double epochStart, double workerID, double workerIDNumBits, FlakelessOutput outputType);

  ~Flakeless();

  static Nan::Persistent<v8::Function> constructor;

  static void New(const Nan::FunctionCallbackInfo<v8::Value>& info);

  static void Next(const Nan::FunctionCallbackInfo<v8::Value>& info);

};

#endif
